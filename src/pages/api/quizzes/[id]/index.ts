import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { quizValidationSchema } from 'validationSchema/quizzes';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.quiz
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getQuizById();
    case 'PUT':
      return updateQuizById();
    case 'DELETE':
      return deleteQuizById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getQuizById() {
    const data = await prisma.quiz.findFirst(convertQueryToPrismaUtil(req.query, 'quiz'));
    return res.status(200).json(data);
  }

  async function updateQuizById() {
    await quizValidationSchema.validate(req.body);
    const data = await prisma.quiz.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteQuizById() {
    const data = await prisma.quiz.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
