<template>
  <header class="header-wrap">
    <div class="logo">
      <span class="logo-img"><img src="../../assets/logo.png"/></span>
      <span class="site-name">购物车</span>
    </div>
    <div class="person-center"></div>
  </header>
</template>
<style lang="scss" scoped>
.header-wrap {
  width: 100%;
  height: 60px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  box-sizing: border-box;
  .logo {
    display: flex;
    align-items: center;
    .logo-img {
      height: 50px;
      margin-right: 10px;
      img {
        height: 100%;
      }
    }
    .site-name {
      font-size: 18px;
      font-weight: bold;
      color: #444;
    }
  }
  .person-center {
    width: 45px;
    height: 45px;
    background: #ccc;
    border-radius: 50%;
  }
}
</style>
