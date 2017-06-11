import * as storage from '@google-cloud/storage';

export function getStorageBucket() {
  return storage(
    { projectId: 'rank-it-app', keyFileName: './prod-creds.json' }
  ).bucket('rank-it-app.appspot.com')
}
