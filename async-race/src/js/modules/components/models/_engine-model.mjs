import { requestEndpoints } from '../../utils/_utils.mjs';
import BaseModel from './_base-model.mjs';

export default class EngineModel extends BaseModel {
  constructor() {
    super(requestEndpoints.engine);
  }

  async switchEngine(id, status) {
    const response = await fetch(
      `${this.requestURL.toString()}?id=${id}&status=${status}`,
      {
        method: 'PATCH',
      }
    );
    const responseData = await response.json();

    if (!response.ok)
      return {
        statusCode: response.status,
        statusText: response.statusText,
        data: responseData,
      };

    return {
      velocity: responseData.velocity,
      distance: responseData.distance,
    };
  }

  async enableDriveMode(id, status) {
    try {
      const response = await fetch(
        `${this.requestURL.toString()}?id=${id}&status=${status}`,
        {
          method: 'PATCH',
        }
      );

      if (response.status !== 200) return { success: false };

      return { success: true };
    } catch (error) {
      return {
        statusCode: error.status,
        statusText: error.statusText,
      };
    }
  }
}

// export const getDriveStatus = async (
//   id: number,
// ): Promise<{ success: boolean }> => {
//   const response = await fetch(`${BASE_URL}/engine?id=${id}&status=drive`, {
//     method: 'PATCH',
//   }).catch();

//   return response.status === 200
//     ? { ...(await response.json()) }
//     : { success: false };
// };

// export const getStartEngine = async (id: number): Promise<Engine> => {
//   const response = await fetch(`${BASE_URL}/engine?id=${id}&status=started`, {
//     method: 'PATCH',
//   });
//   return response.json();
// };

// export const getStopEngine = async (id: number): Promise<Engine> => {
//   const response = await fetch(`${BASE_URL}/engine?id=${id}&status=stopped`, {
//     method: 'PATCH',
//   });
//   return response.json();
// };
