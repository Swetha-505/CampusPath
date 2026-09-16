import { useEffect, useState } from "react";
import api from "../services/api";
import "../Discussion.css";

interface Discussion {
  id: number;
  title: string;
  description: string;
  category: string;
  anonymous: boolean;
  author: string;
}

interface Answer {
  id: number;
  discussion_id: number;
  answer: string;
  anonymous: boolean;
  author: string;
}

function Discussion() {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [answers, setAnswers] = useState<{
    [key: number]: Answer[];
  }>({});

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [anonymous, setAnonymous] = useState(false);

  const [answerText, setAnswerText] = useState<{
    [key: number]: string;
  }>({});

  const [answerAnonymous, setAnswerAnonymous] = useState<{
    [key: number]: boolean;
  }>({});

  const [expandedDiscussion, setExpandedDiscussion] =
    useState<number | null>(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // =====================================================
  // LOAD DISCUSSIONS
  // =====================================================

  useEffect(() => {
    fetchDiscussions();
  }, []);

  const fetchDiscussions = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/discussions");

      setDiscussions(response.data.discussions);
    } catch (err) {
      setError(
        "Unable to load discussions. Please check the backend."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // CREATE DISCUSSION
  // =====================================================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      setError(
        "Please enter a title and description."
      );
      return;
    }

    try {
      setPosting(true);
      setError("");
      setMessage("");

      const response = await api.post(
        "/discussions",
        {
          title: title.trim(),
          description: description.trim(),
          category,
          anonymous,
        }
      );

      const newDiscussion =
        response.data.discussion;

      setDiscussions((previous) => [
        newDiscussion,
        ...previous,
      ]);

      setTitle("");
      setDescription("");
      setCategory("General");
      setAnonymous(false);

      setShowForm(false);

      setMessage(
        "Discussion posted successfully."
      );
    } catch (err) {
      setError(
        "Unable to post discussion. Please check the backend."
      );
    } finally {
      setPosting(false);
    }
  };

  // =====================================================
  // LOAD ANSWERS
  // =====================================================

  const fetchAnswers = async (
    discussionId: number
  ) => {
    try {
      setError("");

      const response = await api.get(
        `/discussions/${discussionId}/answers`
      );

      setAnswers((previous) => ({
        ...previous,
        [discussionId]:
          response.data.answers,
      }));

      setExpandedDiscussion(discussionId);
    } catch (err) {
      setError(
        "Unable to load answers."
      );
    }
  };

  // =====================================================
  // TOGGLE ANSWERS
  // =====================================================

  const handleViewAnswers = async (
    discussionId: number
  ) => {
    setMessage("");
    setError("");

    if (
      expandedDiscussion === discussionId
    ) {
      setExpandedDiscussion(null);
      return;
    }

    await fetchAnswers(discussionId);
  };

  // =====================================================
  // SUBMIT ANSWER
  // =====================================================

  const handleAnswerSubmit = async (
    e: React.FormEvent,
    discussionId: number
  ) => {
    e.preventDefault();

    const text =
      answerText[discussionId] || "";

    if (!text.trim()) {
      setError(
        "Please enter an answer."
      );
      return;
    }

    try {
      setError("");
      setMessage("");

      const response = await api.post(
        `/discussions/${discussionId}/answers`,
        {
          answer: text.trim(),
          anonymous:
            answerAnonymous[discussionId] ||
            false,
        }
      );

      const newAnswer =
        response.data.answer;

      setAnswers((previous) => ({
        ...previous,
        [discussionId]: [
          ...(previous[discussionId] || []),
          newAnswer,
        ],
      }));

      setAnswerText((previous) => ({
        ...previous,
        [discussionId]: "",
      }));

      setAnswerAnonymous((previous) => ({
        ...previous,
        [discussionId]: false,
      }));

      setMessage(
        "Answer posted successfully."
      );
    } catch (err) {
      setError(
        "Unable to post answer."
      );
    }
  };

  // =====================================================
  // FILTER DISCUSSIONS
  // =====================================================

  const filteredDiscussions =
    discussions.filter((discussion) => {
      const search =
        searchTerm.toLowerCase();

      return (
        discussion.title
          .toLowerCase()
          .includes(search) ||
        discussion.description
          .toLowerCase()
          .includes(search) ||
        discussion.category
          .toLowerCase()
          .includes(search)
      );
    });

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="discussion-page">

      {/* Header */}

      <div className="discussion-header">

        <span className="discussion-label">
          STUDENT COMMUNITY
        </span>

        <h1>Discussion</h1>

        <p>
          Ask questions, share experiences and
          learn from fellow students.
        </p>

      </div>

      {/* Actions */}

      <div className="discussion-actions">

        <input
          type="text"
          className="discussion-search"
          placeholder="Search discussions..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />

        <button
          className="primary-button"
          onClick={() => {
            setShowForm(!showForm);
            setError("");
            setMessage("");
          }}
        >
          {showForm
            ? "Close Form"
            : "Ask a Question"}
        </button>

      </div>

      {/* Messages */}

      {message && (
        <div className="discussion-message">
          {message}
        </div>
      )}

      {error && (
        <div className="discussion-error">
          {error}
        </div>
      )}

      {/* Question Form */}

      {showForm && (
        <div className="discussion-form">

          <div className="form-heading">

            <h2>
              Ask a Question
            </h2>

            <button
              className="close-button"
              onClick={() =>
                setShowForm(false)
              }
            >
              ×
            </button>

          </div>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              placeholder="Question title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

            <textarea
              placeholder="Describe your question..."
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >
              <option value="General">
                General
              </option>

              <option value="Academics">
                Academics
              </option>

              <option value="Placements">
                Placements
              </option>

              <option value="Career">
                Career
              </option>

              <option value="Programming">
                Programming
              </option>

              <option value="Campus Life">
                Campus Life
              </option>
            </select>

            <label className="anonymous-option">

              <input
                type="checkbox"
                checked={anonymous}
                onChange={(e) =>
                  setAnonymous(
                    e.target.checked
                  )
                }
              />

              Post anonymously

            </label>

            <div className="form-buttons">

              <button
                type="button"
                className="secondary-button"
                onClick={() =>
                  setShowForm(false)
                }
              >
                Cancel
              </button>

              <button
                type="submit"
                className="primary-button"
                disabled={posting}
              >
                {posting
                  ? "Posting..."
                  : "Post Discussion"}
              </button>

            </div>

          </form>

        </div>
      )}

      {/* Discussion List */}

      <div className="discussion-list">

        <div className="list-heading">

          <div>
            <span className="discussion-label">
              COMMUNITY QUESTIONS
            </span>

            <h2>
              Recent Discussions
            </h2>
          </div>

          <span className="discussion-count">
            {filteredDiscussions.length}{" "}
            {filteredDiscussions.length === 1
              ? "Discussion"
              : "Discussions"}
          </span>

        </div>

        {loading ? (
          <div className="empty-message">
            Loading discussions...
          </div>
        ) : filteredDiscussions.length === 0 ? (
          <div className="empty-message">
            No discussions found.
          </div>
        ) : (
          filteredDiscussions.map(
            (discussion) => {

              const discussionAnswers =
                answers[discussion.id] || [];

              const isExpanded =
                expandedDiscussion ===
                discussion.id;

              return (
                <div
                  className="discussion-post"
                  key={discussion.id}
                >

                  {/* Post Header */}

                  <div className="post-top">

                    <span className="post-category">
                      {discussion.category}
                    </span>

                    <span className="post-author">
                      {discussion.author}
                    </span>

                  </div>

                  {/* Question */}

                  <h3>
                    {discussion.title}
                  </h3>

                  <p>
                    {discussion.description}
                  </p>

                  {/* Actions */}

                  <div className="post-actions">

                    <button
                      onClick={() =>
                        handleViewAnswers(
                          discussion.id
                        )
                      }
                    >
                      {isExpanded
                        ? "Hide Answers"
                        : "View Answers"}
                    </button>

                  </div>

                  {/* Answers */}

                  {isExpanded && (
                    <div className="answers-section">

                      <h4>
                        Answers (
                        {discussionAnswers.length}
                        )
                      </h4>

                      {discussionAnswers.length ===
                      0 ? (
                        <div className="no-answers">
                          No answers yet. Be the
                          first to help!
                        </div>
                      ) : (
                        <div className="answers-list">

                          {discussionAnswers.map(
                            (answer) => (
                              <div
                                className="answer-card"
                                key={answer.id}
                              >

                                <div className="answer-author">
                                  {answer.author}
                                </div>

                                <p>
                                  {answer.answer}
                                </p>

                              </div>
                            )
                          )}

                        </div>
                      )}

                      {/* Answer Form */}

                      <form
                        className="answer-form"
                        onSubmit={(e) =>
                          handleAnswerSubmit(
                            e,
                            discussion.id
                          )
                        }
                      >

                        <textarea
                          placeholder="Write your answer..."
                          value={
                            answerText[
                              discussion.id
                            ] || ""
                          }
                          onChange={(e) =>
                            setAnswerText(
                              (previous) => ({
                                ...previous,
                                [discussion.id]:
                                  e.target.value,
                              })
                            )
                          }
                        />

                        <label className="anonymous-option">

                          <input
                            type="checkbox"
                            checked={
                              answerAnonymous[
                                discussion.id
                              ] || false
                            }
                            onChange={(e) =>
                              setAnswerAnonymous(
                                (previous) => ({
                                  ...previous,
                                  [discussion.id]:
                                    e.target.checked,
                                })
                              )
                            }
                          />

                          Answer anonymously

                        </label>

                        <button
                          type="submit"
                          className="primary-button"
                        >
                          Post Answer
                        </button>

                      </form>

                    </div>
                  )}

                </div>
              );
            }
          )
        )}

      </div>

    </div>
  );
}

export default Discussion;