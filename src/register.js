import fetch from 'node-fetch';
import config from './config.js';

/**
 * Register the metadata to be stored by Discord. This should be a one time action.
 * Note: uses a Bot token for authentication, not a user token.
 */
const url = `https://discord.com/api/v10/applications/${config.DISCORD_CLIENT_ID}/role-connections/metadata`;
// supported types: number_lt=1, number_gt=2, number_eq=3 number_neq=4, datetime_lt=5, datetime_gt=6, boolean_eq=7, boolean_neq=8
// https://discord.com/developers/docs/resources/application-role-connection-metadata#application-role-connection-metadata-object-application-role-connection-metadata-type
const body = [
  {
    key: 'viewprofile',
    name: '프로필 공개',
    description: '프로필 공개 여부 확인',
    type: 7,
  },
  {
    key: 'zzzconnect',
    name: 'ZZZ 연동',
    description: '게임과 연동 여부 확인',
    type: 7,
  },
  {
    key: 'zzzdate',
    name: '연동 일자',
    description: '연동 일자가 동일 혹은 더 높은지 확인',
    type: 6,
  },
  {
    key: 'zzzlevel',
    name: '레벨',
    description: '게임 레벨이 동일 혹은 더 높은지 확인',
    type: 2,
  },
];

const response = await fetch(url, {
  method: 'PUT',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bot ${config.DISCORD_TOKEN}`,
  },
});
if (response.ok) {
  const data = await response.json();
  console.log(data);
} else {
  const data = await response.text();
  console.log(data);
  throw new Error(`Discord metadata 스키마를 푸시하는 중 오류 발생: [${response.status}] ${response.statusText}`);
}