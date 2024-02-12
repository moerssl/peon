import axios from 'axios';

export class TradeSkillMasterApi {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.accessToken = null;
  }

  async getAccessToken() {
    if (!this.accessToken) {
      const response = await this.postToAuth('https://auth.tradeskillmaster.com/oauth2/token', {
        client_id: 'c260f00d-1071-409a-992f-dda2e5498536',
        grant_type: 'api_token',
        scope: 'app:realm-api app:pricing-api',
        token: this.apiKey
      });
      this.accessToken = response.data.access_token;
    }
    return this.accessToken;
  }

  async postToAuth(url, data) {
    try {
      const response = await axios.post(url, data);
      return response;
    } catch (error) {
      console.error('Error posting to authentication endpoint:', error.response ? error.response.data : error.message);
      throw error;
    }
  }

  async makeAuthenticatedGet(url, token) {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error making authenticated call:', error.response ? error.response.data : error.message);
      throw error;
    }
  }

  async makeRealmApiCall(endpoint) {
    const token = await this.getAccessToken();
    return this.makeAuthenticatedGet(`https://realm-api.tradeskillmaster.com/${endpoint}`, token);
  }

  async makePricingApiCall(endpoint) {
    const token = await this.getAccessToken();
    return this.makeAuthenticatedGet(`https://pricing-api.tradeskillmaster.com/${endpoint}`, token);
  }

  async getRegions() {
    return this.makeRealmApiCall('regions');
  }

  async getCommodities(regionId) {
    return this.makePricingApiCall(`region/${regionId}`);
  }

  async getAuctionHouseData(auctionHouseId) {
    return this.makePricingApiCall(`ah/${auctionHouseId}`);
  }

  async getRealmsByName(region, realmName) {
    return this.makeRealmApiCall(`realms-by-name/${region}-${realmName}`);
  }
}

