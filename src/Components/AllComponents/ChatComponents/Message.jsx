import "./MessageStyle.css"

function Message({ img, name, subject, isAgent }) {
    
  return (
    <div className={`message ${isAgent ? 'agent' : 'user'}`}>
      <div className="msg-header">
        <img src={img} alt="" />
        <small className="name">{name}</small>
      </div>
      <div className="subject">{subject}</div>
    </div>
  );
}

export default Message;




