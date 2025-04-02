function Message({ text, sender }) {
    return (
      <div className={`p-2 my-2 rounded ${sender === "You" ? "bg-blue-200 self-end" : "bg-gray-200"}`}>
        <strong>{sender}:</strong> {text}
      </div>
    );
  }
  
  export default Message;
  