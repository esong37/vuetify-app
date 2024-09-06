<template>
  <v-container>
    <v-row>
      <v-col v-for="item in libraryItems" :key="item.id" cols="12" sm="6" md="4" lg="3">
        <v-card>
          <v-card-title>
            {{ item.type }}
            <!-- 收藏标志 -->
            <v-icon
              small
              color="yellow"
              class="ml-2"
            >
              mdi-star
            </v-icon>
          </v-card-title>
          <v-card-subtitle>Added on: {{ formatDate(item.added_date) }}</v-card-subtitle>
          <v-card-text>
            <v-icon v-if="item.type === 'track'">mdi-music</v-icon>
            <v-icon v-else-if="item.type === 'album'">mdi-album</v-icon>
            <v-icon v-else-if="item.type === 'playlist'">mdi-playlist-music</v-icon>
          </v-card-text>

          <!-- 删除按钮 -->
          <v-card-actions>
            <v-btn
              small
              color="red"
              @click="deleteItem(item)"
            >
              <v-icon left>mdi-delete</v-icon>
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from '../axios';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      libraryItems: [], // 用户个人收藏库
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  mounted() {
    if (this.isAuthenticated) {
      this.fetchLibraryItems();
    } else {
      this.$router.push('/login'); // 如果未登录，重定向
    }
  },
  methods: {
    async fetchLibraryItems() {
      try {
        const response = await axios.get('http://localhost:3000/api/library'); // 获取数据
        this.libraryItems = response.data;
      } catch (error) {
        console.error('Error fetching library items:', error);
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          this.$router.push('/login');
        }
      }
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    },
    async deleteItem(item) {
      try {
        // 删除请求的数据
        const deleteData = {
          type: item.type,
          id: item.id,
        };

        // 发送删除请求
        await axios.delete('http://localhost:3000/api/library', { data: deleteData });

        // 成功删除后从前端移除该项
        this.libraryItems = this.libraryItems.filter(i => i.id !== item.id);

        console.log(`Successfully deleted ${item.type} from library.`);
      } catch (error) {
        console.error('Error deleting item from library:', error);
      }
    },
  },
};
</script>

<style scoped>
.v-card {
  margin-bottom: 20px;
  position: relative;
}
</style>
