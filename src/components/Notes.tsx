import { useReducer, useState } from "react";

type Note = {
  id: number;
  text: string;
  priority: "important" | "normal" | "delayed";
};

type State = {
  notes: Note[];
};

type Action =
  | {
      type: "ADD_NOTE";
      payload: { text: string; priority: "important" | "normal" | "delayed" };
    }
  | { type: "DELETE_NOTE"; payload: { id: number } }
  | {
      type: "CHANGE_PRIORITY";
      payload: { id: number; newPriority: "important" | "normal" | "delayed" };
    };


const initialState: State = {
  notes: [],
};


function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_NOTE":
      if (!action.payload.text.trim()) return state;
      const newNote: Note = {
        id: Date.now(),
        text: action.payload.text,
        priority: action.payload.priority,
      };
      return { ...state, notes: [...state.notes, newNote] };

    case "DELETE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((n) => n.id !== action.payload.id),
      };

    case "CHANGE_PRIORITY":
      return {
        ...state,
        notes: state.notes.map((n) =>
          n.id === action.payload.id
            ? { ...n, priority: action.payload.newPriority }
            : n
        ),
      };

    default:
      return state;
  }
}


const Notes = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [text, setText] = useState("");
  const [priority, setPriority] =
    useState<"important" | "normal" | "delayed">("normal");

  const addNote = () => {
    dispatch({ type: "ADD_NOTE", payload: { text, priority } });
    setText("");
    setPriority("normal");
  };

  const groupedNotes = {
    important: state.notes.filter((n) => n.priority === "important"),
    normal: state.notes.filter((n) => n.priority === "normal"),
    delayed: state.notes.filter((n) => n.priority === "delayed"),
  };

  return (
    <div className="p-4 max-w-3xl mx-auto bg-white shadow rounded-2xl mt-15">
      <h2 className="text-xl font-bold mb-4">Note Manager</h2>

      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 border rounded p-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter note..."
        />

        <select
          className="border rounded p-2"
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value as "important" | "normal" | "delayed")
          }
        >
          <option value="important">Important</option>
          <option value="normal">Normal</option>
          <option value="delayed">Delayed</option>
        </select>

        <button
          onClick={addNote}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Note
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 ">
        {Object.entries(groupedNotes).map(([key, notes]) => (
          <div key={key} className="border rounded p-3 bg-gray-50">
            <h3 className="font-semibold capitalize mb-2">{key} Notes</h3>

            {notes.length === 0 && (
              <p className="text-gray-400 text-sm">No notes</p>
            )}

            {notes.map((note) => (
              <div
                key={note.id}
                className="flex flex-col items-center justify-between bg-white border p-2 mb-2 rounded"
              >
                <span>{note.text}</span>
                <div className="flex gap-2">
                  <select
                    value={note.priority}
                    onChange={(e) =>
                      dispatch({
                        type: "CHANGE_PRIORITY",
                        payload: {
                          id: note.id,
                          newPriority: e.target
                            .value as "important" | "normal" | "delayed",
                        },
                      })
                    }
                    className="border rounded p-1 text-sm"
                  >
                    <option value="important">Important</option>
                    <option value="normal">Normal</option>
                    <option value="delayed">Delayed</option>
                  </select>

                  <button
                    onClick={() =>
                      dispatch({
                        type: "DELETE_NOTE",
                        payload: { id: note.id },
                      })
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
