const CookieReader = require('../../../app/services/CookieReader');

describe('Cookie reader', () => {
  it('Should read the cookies effectively', async () => {
    const wantedSessionId = 'ThatsANiceSessionId';
    const wantedDomain = '.instagram.com';
    const wantedExpires = 'Tue, 20-Sep-2022 11:17:04 GMT';
    const wantedMaxAge = '31536000';
    const cookieString = 'sessionid=ThatsANiceSessionId; Domain=.instagram.com; expires=Tue, 20-Sep-2022 11:17:04 GMT; HttpOnly; Max-Age=31536000; Path=/; Secure';
    const sessionId = await CookieReader.read(cookieString, 'sessionid');
    const domain = await CookieReader.read(cookieString, 'Domain');
    const expires = await CookieReader.read(cookieString, 'expires');
    const maxAge = await CookieReader.read(cookieString, 'Max-Age');
    expect(sessionId).toEqual(wantedSessionId);
    expect(domain).toEqual(wantedDomain);
    expect(expires).toEqual(wantedExpires);
    expect(maxAge).toEqual(wantedMaxAge);
  });
});
