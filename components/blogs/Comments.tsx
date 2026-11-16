"use client";

import { FormEvent, useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

type CommentRow = {
  id: string;
  post_slug: string;
  parent_id: string | null;
  author_name: string;
  body: string;
  created_at: string;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function ReplyForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (name: string, body: string) => Promise<void>;
  onCancel: () => void;
}) {
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!body.trim()) return;
    setSubmitting(true);
    await onSubmit(name, body);
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3 space-y-2">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name (optional)"
        maxLength={60}
        className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write a reply..."
        maxLength={2000}
        rows={3}
        required
        className="w-full resize-none rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
      />
      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-foreground px-4 py-1.5 text-xs font-medium text-background transition-colors hover:bg-accent disabled:opacity-50"
        >
          {submitting ? "Posting..." : "Post reply"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full px-4 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function Comments({ slug }: { slug: string }) {
  const [comments, setComments] = useState<CommentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    // React Strict Mode (dev) mounts this effect, cleans it up, then mounts
    // it again. The first run's request gets aborted by the cleanup below
    // but can still resolve (supabase-js returns an abort as a normal
    // {error} result rather than throwing) after the second, real run has
    // already started — so results from a superseded run must be ignored
    // rather than trusted just because they arrived without an exception.
    let cancelled = false;

    (async () => {
      try {
        const { data, error } = await supabase
          .from("comments")
          .select("*")
          .eq("post_slug", slug)
          .order("created_at", { ascending: true })
          .abortSignal(controller.signal);

        if (cancelled) return;
        if (error) setError("Couldn't load comments. Try again later.");
        else setComments(data ?? []);
      } catch {
        if (cancelled) return;
        setError("Couldn't reach the comments service. Try again later.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      controller.abort();
    };
  }, [slug]);

  const postComment = async (
    authorName: string,
    commentBody: string,
    parentId: string | null
  ) => {
    if (!supabase) return;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
      const { data, error } = await supabase
        .from("comments")
        .insert({
          post_slug: slug,
          parent_id: parentId,
          author_name: authorName.trim() || "Anonymous",
          body: commentBody.trim(),
        })
        .select()
        .abortSignal(controller.signal)
        .single();

      if (error) {
        setError("Couldn't post your comment. Try again later.");
        return;
      }
      if (data) setComments((prev) => [...prev, data]);
    } catch {
      setError("Couldn't post your comment. Try again later.");
    } finally {
      clearTimeout(timeout);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!body.trim()) return;
    setSubmitting(true);
    await postComment(name, body, null);
    setSubmitting(false);
    setName("");
    setBody("");
  };

  if (!supabase) {
    return (
      <div className="mt-16 border-t border-border pt-10">
        <h2 className="font-display mb-2 flex items-center gap-2 text-2xl font-medium">
          <MessageCircle size={20} />
          Comments
        </h2>
        <p className="text-sm text-muted">Comments aren&apos;t set up yet. Check back soon.</p>
      </div>
    );
  }

  const topLevel = comments.filter((c) => !c.parent_id);
  const repliesOf = (id: string) => comments.filter((c) => c.parent_id === id);

  return (
    <div className="mt-16 border-t border-border pt-10">
      <h2 className="font-display mb-6 flex items-center gap-2 text-2xl font-medium">
        <MessageCircle size={20} />
        Comments {comments.length > 0 && `(${comments.length})`}
      </h2>

      <form onSubmit={handleSubmit} className="mb-10 space-y-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name (optional)"
          maxLength={60}
          className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-accent"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Ask a question or leave a comment..."
          maxLength={2000}
          rows={4}
          required
          className="w-full resize-none rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-accent"
        />
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition-colors hover:bg-accent disabled:opacity-50"
        >
          {submitting ? "Posting..." : "Post comment"}
        </button>
      </form>

      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

      {loading ? (
        <p className="text-sm text-muted">Loading comments...</p>
      ) : topLevel.length === 0 ? (
        <p className="text-sm text-muted">No comments yet. Be the first to ask something.</p>
      ) : (
        <div className="space-y-6">
          {topLevel.map((c) => (
            <div key={c.id}>
              <div className="rounded-2xl border border-border bg-surface p-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">{c.author_name}</span>
                  <span className="text-xs text-muted">{formatDate(c.created_at)}</span>
                </div>
                <p className="mt-1.5 whitespace-pre-wrap text-sm leading-relaxed text-foreground/85">
                  {c.body}
                </p>
                <button
                  onClick={() => setReplyingTo(replyingTo === c.id ? null : c.id)}
                  className="mt-2 text-xs font-medium text-accent"
                >
                  Reply
                </button>
                {replyingTo === c.id && (
                  <ReplyForm
                    onSubmit={async (replyName, replyBody) => {
                      await postComment(replyName, replyBody, c.id);
                      setReplyingTo(null);
                    }}
                    onCancel={() => setReplyingTo(null)}
                  />
                )}
              </div>

              {repliesOf(c.id).length > 0 && (
                <div className="ml-6 mt-3 space-y-3 border-l-2 border-border pl-4">
                  {repliesOf(c.id).map((r) => (
                    <div key={r.id} className="rounded-2xl border border-border bg-surface p-4">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium">{r.author_name}</span>
                        <span className="text-xs text-muted">{formatDate(r.created_at)}</span>
                      </div>
                      <p className="mt-1.5 whitespace-pre-wrap text-sm leading-relaxed text-foreground/85">
                        {r.body}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
