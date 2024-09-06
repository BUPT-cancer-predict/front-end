<template>
  <div id="page-footer">
    <div class="links">
      <a href="#" class="link-item">产品中心</a>
      <a href="#" class="link-item">公司介绍</a>
      <a href="#" class="link-item">咨询</a>
      <a href="#" class="link-item">介绍视频</a>
      <a href="#" class="link-item">友情链接</a>
      <a href="#" class="link-item">商务合作</a>
    </div>

    <footer>
      <p>&copy; 2024 BUPT. 版权所有</p>
    </footer>
  </div>
</template>

<style>
.page-footer {
  margin-top: 20px;
}

.new-source-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.links {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.link-item {
  text-decoration: none;
  color: #007bff;
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
  margin-top: 0px;
  font-size: 0.8em;
  color: black;
  text-align: center;
}
</style>