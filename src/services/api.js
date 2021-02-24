import { stringify } from 'qs';
import request from '@/utils/request';
import fetch from 'dva/fetch';

/**User */
export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryUsers() {
  return request('/api/users');
}

export async function queryUser({ username }) {
  return request(`/api/users/${username}`);
}

export async function setCurrentAvtar(params) {
  return request('/api/user/avartar', {
    method: 'POST',
    body: params,
  }); 
}

export async function setCurrentUser(params){
  return request('/api/users/setting', {
    method: 'POST',
    body: params
  })
}

export async function accountLogin(params) {
  return request(`/api/users/login`, {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

/**loc platform */
export async function getAutomation() {
  return request(`/api/platform/automation`);
}

export async function getRegistration() {
  return request(`/api/platform/registration`);
}

export async function getRepository() {
  return request(`/api/platform/repository`);
}

export async function getInstallation() {
  return request(`/api/platform/installation`);
}

export async function getInventory() {
  return request(`/api/platform/inventory`);
}

/** loc cloud */
export async function getCloud({ cloudid }) {
  return request(`/api/cloud/detail/${cloudid}`);
}

export async function getClouds() {
  return request(`/api/cloud/list`);
}

/**loc ceph */
export async function getCephs() {
  return request(`/api/storage/cephs`);
}

export async function getCeph({ cephid }) {
  return request(`/api/storage/cephs/${cephid}`);
}

/**Dashboard */

export async function getDashboard() {
  return request(`/api/dashboard`);
}