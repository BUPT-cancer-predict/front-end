<template>
  <div id="page-footer">
    <div class="links">
      <router-link to="/#" class="link-item">关于我们</router-link>
      <router-link to="/#" class="link-item">研究进展</router-link>
      <router-link to="/#" class="link-item">联系我们</router-link>
      <router-link to="/#" class="link-item">使用说明</router-link>
      <router-link to="/#" class="link-item">隐私政策</router-link>
      <router-link to="/#" class="link-item">用户反馈</router-link>
    </div>

    <footer>
      <p>&copy; 2024 Cancer Prediction System. All rights reserved.</p>
    </footer>
  </div>
</template>

<style>
#page-footer {
  margin-top: 20px;
}

.links {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.link-item {
  text-decoration: none;
  color: #007bff;
  font-size: 1em;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.link-item:hover {
  background-color: #0056b3;
  color: white;
}

footer {
  margin-top: 10px;
  font-size: 0.8em;
  color: black;
  text-align: center;
}
</style>