// pages/plan.jsx
import { useState } from 'react';
import './plan.css';

function PlanPage({ onBack }) {
  const [vibe, setVibe] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleVibeSubmit = (e) => {
    e.preventDefault();
    if (vibe.trim()) {
      console.log('Vibe submitted:', vibe);
      setVibe('');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      console.log('File selected:', file.name);
    }
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      console.log('File dropped:', file.name);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <section id="plan-page">
      <div className="plan-card">
        <div className="plan-header">
          <div className="plan-header-left">
            <button onClick={onBack} className="back-button-plan">
              ← Back
            </button>
            <h1>My Plan</h1>
          </div>
        </div>

        <div className="welcome-section">
          <h2>Welcome User!</h2>
        </div>

        <div className="vibe-section">
          <label htmlFor="vibe-input">What is the vibe today?</label>
          <form className="vibe-input-container" onSubmit={handleVibeSubmit}>
            <input
              id="vibe-input"
              type="text"
              placeholder="e.g., Focused, Creative, Chill..."
              value={vibe}
              onChange={(e) => setVibe(e.target.value)}
            />
            <button type="submit" className="vibe-submit-btn">
              Set Vibe
            </button>
          </form>
        </div>

        <div className="upload-section">
          <label>Upload here:</label>
          <div 
            className={`upload-area ${isDragging ? 'dragover' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input 
              type="file" 
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.gif"
            />

            <p className="upload-text">
              <strong>Click to upload</strong> or drag and drop
            </p>
            <p className="upload-subtext">
              PDF, DOC, TXT, PNG, JPG (Max 10MB)
            </p>
          </div>

          {selectedFile && (
            <div className="file-preview">
              <div className="file-info">
                <span className="file-name">{selectedFile.name}</span>
                <span className="file-size">({formatFileSize(selectedFile.size)})</span>
              </div>
              <button className="file-remove" onClick={handleFileRemove}>
                ×
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default PlanPage;