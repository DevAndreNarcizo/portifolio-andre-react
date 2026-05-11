import { notes } from '../data';
import './Notes.css';

const Notes = () => {
  return (
    <section id="notas" className="section bg-alt">
      <div className="container">
        <h2 className="section-title">Engineering Notes</h2>
        <p className="section-subtitle">
          Technical decisions, architecture insights, and reflections on building software.
        </p>

        <div className="notes-list">
          {notes.map((note) => (
            <article key={note.id} className="note-card">
              <div className="note-meta">
                <span className="note-date">{note.date}</span>
              </div>
              <h3 className="note-title">{note.title}</h3>
              <p className="note-summary">{note.summary}</p>

              <div className="note-content">
                {note.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="note-footer">
                <div className="note-learning">
                  <strong>Key insight:</strong> {note.learning}
                </div>
                <div className="note-next">
                  <strong>Next step:</strong> {note.nextStep}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Notes;
