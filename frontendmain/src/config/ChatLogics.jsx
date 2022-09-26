export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};
export const getSenderObject = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};

export const getSenderImage = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].pic : users[0].pic;
};
// in order to display single profile photo on multiple messages
export const isSameSender = (message, m, i, userId) => {
  return (
    i < message.length - 1 &&
    (message[i + 1].sender._id !== m.sender._id ||
      message[i + 1].sender._id === undefined) &&
    message[i].sender._id !== userId
  );
};

export const isLastMessage = (message, i, userId) => {
  return (
    i === message.length - 1 &&
    message[message.length - 1].sender._id !== userId &&
    message[message.length - 1].sender._id
  );
};


export const sameUser = (message, m,index)=>{
      return index > 0 && message[index - 1 ].sender._Id === m.sender._id
}

// in order to manage the margin of the messages depending on which user has sent the message.

// i will return an amount of margin depeding upon which user has sent the message.

export const messageMargin = (message, m, index, userId) => {
  if (
    index < message.length - 1 &&
    message[index + 1].sender._id === m.sender.id &&
    message[index].sender._id !== userId
  ) {
    return 35;
  }

  else if(
      (index < message.length - 1 && message[index+1].sender._id !== m.sender._id && message[index].sender._id !== userId) ||(index === message.length -1 && message.length - 1 && message[index].sender._id !== userId)
      ){
            return 0;
      }
  

      else return "auto";
};
