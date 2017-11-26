import {NetworkService as networkService} from '../network/NetworkService';

const basePath = 'http://localhost:8080/api/0.1/subkleddit';
const getAllPath = "/all";

export const SubkledditService = {};

SubkledditService.getDefaultSubkleddits = function() {
  return networkService.get(basePath + getAllPath);
};