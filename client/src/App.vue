<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
.loadingModal {
    margin-top: 15%;
    size: 10px;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1
    /*display: none;*/
  }
  .theModal {
    position: absolute;
    top: 20%;
    left: 50%;
    -webkit-transition: .5s;
    transition: .5s;
    width: 100%;
    min-width: 600px;
    max-width: 800px;
    background: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
    padding: 1em;
    color: black;
    text-align: center;
  }
</style>
