import { baseUrl } from '@/config/index'

async function fetchRequest(endpoint: any, options: any = {}) {
  // 拦截请求并添加 Token
  const headers = {
    Authorization: localStorage.getItem('token'),
    ...options.headers,
  };

  // 设置请求的基础 URL
  const url = `${baseUrl}/${endpoint}`;

  try {
    const response = await fetch(url, { ...options, headers });
    // 在这里可以进行其他拦截操作，如根据响应状态码处理错误等

    if (!response.ok) {
      throw new Error('请求失败');
    }

    return response;
  } catch (error) {
    console.error('请求出错：', error);
    throw error;
  }
}

export default fetchRequest;