import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from './button';

const RichCommentEditor = ({ value, onChange, onSubmit, placeholder = 'Leave a comment...' }) => {
  return (
    <div className="space-y-3">
      <div className="border rounded-lg">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          modules={{
            toolbar: [
              ['bold', 'italic', 'underline'],
              ['link'],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              [{ 'header': [1, 2, false] }],
              ['clean']
            ],
            imageHandler: {
              upload: (data) => {
                // Mock image upload
                return new Promise((resolve) => {
                  setTimeout(() => resolve('/logo.png'), 1000);
                });
              }
            }
          }}
          className="min-h-[120px]"
          style={{ height: 'auto', minHeight: '120px' }}
        />
      </div>
      <Button onClick={onSubmit} className="ml-auto">
        Post Comment
      </Button>
    </div>
  );
};

export default RichCommentEditor;

