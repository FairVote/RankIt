import * as functions from 'firebase-functions';
import { renderWidget } from '@rankit/widget/app';
import { getStorageBucket } from './_internal';

const bucket = getStorageBucket();

const verbose = true;

export const generateWidget = functions.database.ref(`/vote`).onWrite((evt) => {

});

export async function doGenerateWidget(pollId: string) {
  if (verbose) {
    console.info(`Generating widget for poll: ${pollId}`);
  }

  const html = await renderWidget(pollId);

  if (verbose) {
    console.info(`Successfully rendered widget to string: ${pollId}`);
  }

  const file = bucket.file(`widgets/${pollId}.html`);

  const uploadResult = await file.save(html);

  if (verbose) {
    console.info(`Upload successful: ${pollId}`);
  }
  const makePublicResult = await file.makePublic();

  if (verbose) {
    console.info(`Publishing successful: ${pollId}`);
  }

  return html;

}

doGenerateWidget('asdf');
