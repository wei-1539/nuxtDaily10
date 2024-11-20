export const useRoom = () => {
  const baseURL = `https://nuxr3.zeabur.app/api/v1/`;
  const roomsList = ref([]);

  const getRoomList = async () => {
    const { data } = await useFetch('/rooms', {
      method: 'GET',
      baseURL,
      transform: (res) => res.result,
      onResponseError(response) {
        const { message } = response._data;
        console.error('getRoomListError:', message);
        return Promise.reject(message);
      },

    })
    roomsList.value = data.value
  }

  const roomDetail = ref({})

  const getRoomDetail = async (id) => {
    const { data } = await useFetch(`/rooms/${id}`, {
      method: 'GET',
      baseURL,
      transform: (res) => res.result,
      onResponseError(response) {
        const { message } = response._data;
        console.error('getRoomDetailError:', message);
        return Promise.reject(message);
      },

    })
    roomDetail.value = data.value
  }



  return {
    roomsList,
    getRoomList,
    roomDetail,
    getRoomDetail
  }
}
