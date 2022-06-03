import prisma from "utils/prisma";

function getUserByUsername(username) {
  const user = prisma.user.findUnique({
    where: { username },
  });
  return user;
}