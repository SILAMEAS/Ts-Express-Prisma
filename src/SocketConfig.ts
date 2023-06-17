export const SocketConfig = ({
  socket,
  allUsers,
}: {
  socket: any;
  allUsers: string[];
}) => {
  // when user connect server using socket
  socket.on("connected", (data: any) => {
    !allUsers.includes(data.name) && allUsers.push(data.name);
    allUsers = allUsers.filter((item) => item !== null || item !== undefined);
    console.log("onlines", allUsers);
  });
  // when user disconnect server from socket
  socket.on("disconnected", (data: any) => {
    if (allUsers.includes(data.name))
      allUsers = allUsers.filter((item) => item !== data.name || item !== null);
    console.log("offline", allUsers);
  });

  socket.on("start-active", (data: any) => {
    console.log("post active");
    socket.broadcast.emit("active", data);
  });

  socket.emit("getUseronline", allUsers);
  socket.on("join-room", (data: any) => {
    console.log("join room", data);
    socket.join(data);
  });

  socket.on("send-message", (data: any) => {
    console.log("send", data);
    socket.broadcast.emit("receive-message", data);
    // socket.to(data.room).emit("receive-message", data);
  });
};
