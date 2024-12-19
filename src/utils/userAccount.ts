import { v4 as uuidv4 } from "uuid";

export class UserAccount {
  static generateUniqueToken(expiresTimeInHours: number = 24) {
    const tokenExpiresDate = new Date();
    tokenExpiresDate.setHours(tokenExpiresDate.getHours() + expiresTimeInHours);

    return {
      _uuid: UserAccount._generateUUID(),
      expires: tokenExpiresDate,
    };
  }
  static _generateUUID() {
    return uuidv4();
  }
}
