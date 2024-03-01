import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from "node-fetch";
import stream from 'stream';
import { promisify } from 'util';

const pipeline = promisify(stream.pipeline);

const RESUME_URL_ORIGINAL = "https://res.cloudinary.com/mahitm-cdn/image/upload/mahitm/resume-2024-v1.pdf"; 

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const response = await fetch(RESUME_URL_ORIGINAL).catch(() => null);
  if (!response) {
      res.status(500).send(null);
      return
  }

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');

  return await pipeline(response.body as any, res);
}
