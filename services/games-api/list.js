import * as dynamoDbLib from '../../libs/dynamodb-lib';
import { success, failure } from '../../libs/response-lib';

export async function main(event, context) {
  const params = {
    TableName: 'games',
    KeyConditionExpression: 'leagueId = :leagueId',
    ExpressionAttributeValues: {
      // TODO: This isn't right, just a placeholder
      ':leagueId': event.requestContext.identity.cognitoIdentityId,
    },
  };

  try {
    const result = await dynamoDbLib.call('query', params);
    return success(result.Items);
  } catch (e) {
    return failure({ status: false });
  }
}
