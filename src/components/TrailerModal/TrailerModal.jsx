const TrailerModal = ({ trailerKey, onClose }) => {
  if (!trailerKey) return null;

  return (
    <div className="modal" role="dialog" aria-modal="true">
      <div className="modal__overlay" onClick={onClose} />
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}>
          ✕
        </button>
        <div className="modal__video">
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="Movie trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;
