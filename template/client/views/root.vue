<template>
  <v-app>
    <document-title>全栈Web框架</document-title>
    <v-app-bar color="white" app>
      <v-toolbar-title>全栈Web框架</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <v-layout>
          <v-flex size12>
            <v-card flat color="transparent">
              <v-responsive :aspect-ratio="16/6">
                <v-container fill-height>
                  <v-layout justify-center column align-center>
                    <h1 class="mb-2 display-2 ">全栈开发框架</h1>
                    <v-subheader class="text-xs-center">适用于小型项目的、前后端一体的、支持ssr的网站快速开发框架</v-subheader>
                  </v-layout>
                </v-container>
              </v-responsive>
            </v-card>
          </v-flex>
        </v-layout>

        <v-layout align-center justify-center>
          <h2 class="headline text-xs-center font-weight-light">技术栈</h2>
        </v-layout>
        <v-layout>
          <v-flex>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex v-for="tool in tools" :key="tool.name" xs12 md3>
                  <v-card class="d-flex align-center" :href="tool.href">
                    <v-img
                      :src="tool.img"
                      aspect-ratio="1"
                      class="white"
                    >
                      <template v-slot:placeholder>
                        <v-layout
                          fill-height
                          align-center
                          justify-center
                          ma-0
                        >
                          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                        </v-layout>
                      </template>
                    </v-img>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import koaImg from '@client/assets/koa.png'
import vueImg from '@client/assets/vue.png'
import webpackImg from '@client/assets/webpack.png'
import babelImg from '@client/assets/babel.png'
import eslintImg from '@client/assets/eslint.png'
import typeormImg from '@client/assets/typeorm.png'
import vuetifyImg from '@client/assets/vuetify.png'
import miliImg from '@client/assets/mili.png'

export default {
  data() {
    return {
      tools: [
        { name: 'vue', img: vueImg, href: 'https://cn.vuejs.org/' },
        { name: 'vuetify', img: vuetifyImg, href: 'https://vuetifyjs.com' },
        { name: 'koa', img: koaImg, href: 'https://koajs.com/' },
        { name: 'typeorm', img: typeormImg, href: 'https://typeorm.io/' },
        { name: 'webpack', img: webpackImg, href: 'https://webpack.js.org/' },
        { name: 'babel', img: babelImg, href: 'https://babeljs.io/' },
        { name: 'eslint', img: eslintImg, href: 'https://eslint.org/' },
        { name: 'mili', img: miliImg, href: 'https://github.com/Val-istar-Guo/mili' },
      ]
    }
  }
}
</script>
<style lang="postcss" scoped>
</style>
