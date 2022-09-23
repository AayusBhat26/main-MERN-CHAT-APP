export const getSender = (loggedUser, users)=>{
      return users[0]._id === loggedUser._id ? users[1].name: users[0].name;
}
export const getSenderObject = (loggedUser, users)=>{
      return users[0]._id === loggedUser._id ? users[1] : users[0];
}

export const getSenderImage = (loggedUser, users)=>{
      return users[0]._id === loggedUser._id ? users[1].pic : users[0].pic;

}