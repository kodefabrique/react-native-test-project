import { graphql } from 'graphql';
import { AircraftVariables, QueryResult, Aircraft } from 'types';

const query = graphql`
  query Aircraft($id: String) {
    AircraftInfo(id: $id) {
      title
      icon
      images
      scheme
      cabins {
        title
        image
        parameters {
          title
          value
        }
      }
      description
      parameters {
        title
        value
      }
      id
      name
    }
  }
`;

export async function getAircraftInfo(variables: AircraftVariables): Promise<QueryResult<Aircraft>> {
  return await query.query(variables);
}
