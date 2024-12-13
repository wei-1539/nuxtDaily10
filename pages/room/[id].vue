<script setup>
const router = useRouter();
const route = useRoute();

// 串接 API 取得房型詳細資料
// API path : https://nuxr3.zeabur.app/api/v1/rooms/{id}
// 將資料渲染至下方的 div.room-page 區塊

const { id } = route.params;
const { roomDetail, getRoomDetail } = useRoom();
await getRoomDetail(id);
const isProvide = function (isProvideBoolean = false) {
  return isProvideBoolean ? "提供" : "未提供";
};
// useSeoMeta({
//   title: roomDetail.value.name,
//   titleTemplate: (title) => `Freyja | ${title}`,
//   description: () => `${roomDetail.value.description}`,
//   ogTitle: () => `Freyja | ${roomDetail.value.name}`,
//   ogDescription: () => `${roomDetail.value.description}`,
//   ogImage: () => `${roomDetail.value.imageUrl}`,
//   ogUrl: () => `https://freyja.travel.com.tw/room/${roomDetail.value._id}`,
//   twitterCard: `summary_large_image`,
//   twitterTitle: () => `Freyja | ${roomDetail.value.name}`,
//   twitterDescription: () => `${roomDetail.value.description}`,
//   twitterImage: () => `${roomDetail.value.imageUrl}`,
// });

// 使用 useSeoMeta  將 roomObject 的資訊寫入 SEO Meta
/* 請撰寫 useSeoMeta({ }) 渲染出下方的 HTML 結構，並將 {{ }}  改成使用 roomObject 物件的資料。
<title> Freyja | {{ 房型名稱 }}</title>
<meta name="description" content="{{ 房型描述 }}">
<meta property="og:title" content="Freyja | {{ 房型名稱 }} ">
<meta property="og:description" content="{{ 房型描述 }}">
<meta property="og:image" content="{{房型主圖}}">
<meta property="og:url" content="https://freyja.travel.com.tw/room/{房型 id }">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Freyja | {{ 房型名稱 }}">
<meta name="twitter:description" content="{{ 房型描述 }}">
<meta name="twitter:image" content="{{房型主圖}}">
*/

/*useSeoMeta({

});
*/

const title = ref(roomDetail.value.name);
const titleTemplate = computed(() => `Freyja | ${title}`);
const description = ref(roomDetail.value.description);
</script>

<template>
  <div>
    <Head>
      <Title>{{ titleTemplate }}</Title>
      <Meta name="description" :content="description" />
      <Meta property="og:title" :content="titleTemplate" />
      <Meta property="og:description" :content="description" />
      <Meta property="og:image" :content="roomDetail.imageUrl" />
      <Meta
        property="og:url"
        :content="`https://freyja.travel.com.tw/room/${roomDetail._id}`"
      />
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:title" :content="titleTemplate" />
      <Meta name="twitter:description" :content="description" />
      <Meta name="twitter:image" :content="roomDetail.imageUrl" />
    </Head>
    <h2>房型詳細頁面</h2>

    {{ roomDetail }}

    <div class="container">
      <button @click="router.go(-1)">回上一頁</button>
      <div class="row justify-content-center">
        <div class="col-lg-6">
          <div class="room-page">
            <div class="room-header">
              <h1 class="room-name">{{ roomDetail.name }}</h1>
              <p class="room-description">
                {{ roomDetail.description }}
              </p>
            </div>

            <div class="room-gallery">
              <img
                :src="roomDetail.imageUrl"
                :alt="roomDetail.name"
                class="room-main-image"
              />
              <ul class="room-image-list">
                <li
                  v-for="(imageUrl, index) in roomDetail.imageUrlList"
                  :key="index"
                >
                  <img
                    :src="imageUrl"
                    :alt="`${roomDetail.name}圖片${index + 1}`"
                  />
                </li>
              </ul>
            </div>

            <div class="room-info">
              <div class="info-block">
                <h2>房間資訊</h2>
                <p>面積: {{ roomDetail.areaInfo }}</p>
                <p>床型: {{ roomDetail.bedInfo }}</p>
                <p>最多容納人數: {{ roomDetail.maxPeople }}</p>
                <p>價格: {{ roomDetail.price }}</p>
              </div>

              <div class="info-block">
                <h2>房間配置</h2>
                <ul>
                  <li
                    v-for="layout in roomDetail.layoutInfo"
                    :key="layout.title"
                  >
                    {{ layout.title }}: {{ isProvide(layout.isProvide) }}
                  </li>
                </ul>
              </div>

              <div class="info-block">
                <h2>房內設施</h2>
                <ul>
                  <li
                    v-for="facility in roomDetail.facilityInfo"
                    :key="facility.title"
                  >
                    {{ facility.title }}: {{ isProvide(facility.isProvide) }}
                  </li>
                </ul>
              </div>

              <div class="info-block">
                <h2>客房備品</h2>
                <ul>
                  <li
                    v-for="amenity in roomDetail.amenityInfo"
                    :key="amenity.title"
                  >
                    {{ amenity.title }}: {{ isProvide(amenity.isProvide) }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.room-page {
  max-width: 1200px;
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.room-header {
  text-align: center;
  margin-bottom: 30px;
}

.room-name {
  font-size: 2rem;
  color: #333;
}

.room-description {
  font-size: 1rem;
  color: #666;
}

.room-gallery {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}

.room-main-image {
  width: 100%;
  max-width: 600px;
  height: auto;
  border-radius: 10px;
  margin-bottom: 20px;
}

.room-image-list {
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 0;
  list-style: none;
}

.room-image-list img {
  width: 100px;
  height: auto;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.3s;
}

.room-image-list img:hover {
  transform: scale(1.1);
}

.room-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-block {
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 10px;
}

.info-block h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #444;
}

.info-block p,
.info-block ul {
  font-size: 1rem;
  color: #555;
}

.info-block ul {
  list-style: none;
  padding-left: 0;
}

.info-block ul li {
  margin-bottom: 5px;
}
</style>
