interface NoteDetailsProps {
  content: string;
}

function NoteDetails({ content }: NoteDetailsProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-2">Content</label>
      <div className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
        <pre className="text-white whitespace-pre-wrap font-mono text-sm">{content}</pre>
      </div>
    </div>
  );
}

export default NoteDetails; 