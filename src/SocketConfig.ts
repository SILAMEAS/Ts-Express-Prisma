export const SocketConfig = ({ socket }: { socket: any }) => {
  let allUsers: string[] = [];
  // active interact with all user in application
  socket.on("start-active", (data: any) => {
    console.log("start active");
    socket.broadcast.emit("active", data);
  });
  // join room
  socket.on("join-room", (data: any) => {
    console.log("join room", data);
    socket.join(data);
  });
  // sent message in broadcast
  socket.on("send-message", (data: any) => {
    console.log("send", data);
    socket.broadcast.emit("receive-message", data);
    // socket.to(data.room).emit("receive-message", data);
  });
  // when user connect server using socket
  socket.on("connected", (data: any) => {
    !allUsers.includes(data.name) && allUsers.push(data.name);
    allUsers = allUsers.filter((item) => item !== null || item !== undefined);
    console.log("onlines", allUsers);
  });
  // when user disconnect server from socket
  socket.on("disconnected", (data: any) => {
    let offlineUser: any = [];
    if (allUsers.includes(data.name))
      offlineUser = allUsers.filter((item) => item === data.name);
    console.log("offline ", offlineUser);
  });

  socket.broadcast.emit("getUseronline", allUsers);
  console.log("users", allUsers);
};
