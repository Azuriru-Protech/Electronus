import { useState } from 'react'
import './Feedback.scss'
import { Button, Divider, Input } from 'antd'
import CloseIcon from '@renderer/assets/images/icons/close-icon.svg'
import AddIcon from '@renderer/assets/images/icons/add-icon.svg'

export default function Feedback() {
  const [feedbackType, setFeedbackType] = useState(0)
  const [screenshots, setScreenshots] = useState<string[]>([])
  const [feedbackContent, setFeedbackContent] = useState('')

  const feedbackTypes = [
    { id: 1, name: 'Suggestion' },
    { id: 2, name: 'Error' },
    { id: 3, name: 'Other' }
  ]

  const handleImageChange = (event: any) => {
    const files = event.target.files
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const reader = new FileReader()
        reader.onload = (e: any) => {
          setScreenshots((prevScreenshots) => [...prevScreenshots, e.target.result])
        }
        reader.readAsDataURL(file)
      }
    }
  }

  return (
    <div>
      <div className="feedback-wrapper">
        <div className="feedback-type-wrapper">
          <div className="title">Feedback Type</div>
          <div className="feedback-button-wrapper">
            {feedbackTypes.map((type) => (
              <div
                className="feedback-button"
                style={{
                  backgroundColor: feedbackType === type.id ? '#6795ff' : '#fff',
                  color: feedbackType === type.id ? '#fff' : '#6d6c72'
                }}
                key={type.id}
                onClick={() => setFeedbackType(type.id)}
              >
                {type.name}
              </div>
            ))}
          </div>
        </div>
        <Divider />

        <div className="feedback-description-container">
          <div className="title">Feedback Content</div>
          <Input.TextArea
            placeholder="Please input your feedback content"
            maxLength={300}
            style={{ width: 500, height: 120, borderRadius: 4 }}
            showCount
            value={feedbackContent}
            onChange={(e) => setFeedbackContent(e.target.value)}
          />

          <div className="title">Feedback Screenshots ({screenshots.length}/5)</div>
          <div className="feedback-screenshot-wrapper">
            {screenshots.map((screenshot, index) => (
              <div className="screenshot-wrapper" key={index}>
                <img className="screenshot" src={screenshot} alt="screenshot" />
                <img
                  className="close-icon"
                  src={CloseIcon}
                  alt="close"
                  onClick={() => setScreenshots(screenshots.filter((_, i) => i !== index))}
                />
              </div>
            ))}
            <input
              id="screenshot-input" // Added ID
              className="screenshot-input"
              type="file" // Corrected type
              multiple
              onChange={handleImageChange}
              accept="image/*"
              style={{ display: 'none' }} // Hide the input
            />
            {screenshots.length < 5 && (
              <label htmlFor="screenshot-input" className="custom-file-upload">
                <div className="upload-screenshot-wrapper">
                  <img className="add-icon" src={AddIcon} alt="add" />
                  <p className="upload-screenshot-text">Add Screenshots</p>
                </div>
              </label>
            )}
          </div>
          <Button type="primary" block>
            Submit
          </Button>
        </div>
      </div>
    </div>
  )
}
