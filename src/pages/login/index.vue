<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { Base64 } from 'js-base64';
import config from '@/config';
import { useUserStore } from '@/store'
import { useLoading } from '@/hooks/useLoading'

// 路由控制
const router = useRouter()
// 路由信息
const route = useRoute()
// loading hook
const { loading, setLoading } = useLoading(false)

// 登录表单数据
const loginForm = ref<any>({
  account: 'admin',
  pwd: '123456'
})

const env = import.meta.env;

/**
 * 登录操作
 */
const login = () => {
  setLoading(true)
  // 用户store
  const userStore = useUserStore()
  // 登录
  userStore.login(loginForm.value).then(async () => {
    // 获取用户信息
    await userStore.getUserInfo()
    // replace到重定向的页面或者首页
    router.replace({path: route.query.url ? Base64.decode(route.query.url as string) : config.homePath})
  }).finally(() => {
    setLoading(false)
  })
}
</script>

<template>
  <div class="login-page">
    <div class="form">
      <div class="logo">
       <img v-if="config.logo" :src="config.logo" alt="">
        <span>{{ config.title }}</span>
      </div>
      <el-form
        :model="loginForm"
        :disabled="loading"
      >
        <el-form-item
          prop="account"
          :rules="[{ required: true, message: '请输入账号!' }]"
        >
          <el-input placeholder="账号" v-model="loginForm.account" />
        </el-form-item>
        <el-form-item
          prop="pwd"
          :rules="[{ required: true, message: '请输入密码!' }]"
        >
          <el-input type="password" placeholder="密码" v-model="loginForm.pwd" @keydown.enter="login" />
        </el-form-item>
        <el-form-item
          prop="code"
          v-if="false"
          :rules="[{ required: true, message: '请输入验证码!' }]"
        >
          <div class="w-full flex justify-center items-center">
            <div class="flex-1 flex justify-center items-center">
              <el-input type="password" placeholder="验证码" v-model="loginForm.code" @keydown.enter="login" />
            </div>
            <div class="flex-1 flex justify-end items-center">
              <img style="cursor: pointer;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAAAwCAIAAABSYzXUAAAP6UlEQVR42u1aCXBURRpOUBAWUBG1tJatwhVXdFVUQA4FRWEFV1lUVLxlSycJk9MkkECCARJICCwEQ2CSTDK574Pc9yTkvjMJkwtyH+S+hhyTZKb37+mXN5OXmclRuurWdHWl+vXr9Lz6vv7/7///97SQpv0OmpYGAg0NmqahQUODpmlo0NCgaRoaNDRomoaG31PrFk0UNg6HFvfd7hzT0PCrt7uD4wTuC0kd+gHN7zvffsFGuMKgRItVRLozv+t/SsNQd32jIKqhLBL+NpXHtNxKaKtO66zL7W0RDPU0iIf7f5mfGR9CbWn47y/yzMOjaYXV8Ff9MtGYpOruaMKtQfesbpvo9u94DW9dqFlnVbGUTcGtrVu4xCBnuXHGSjP+Q+YpK03THjYufflM5QGXO5Fl/Qui4d49VFeHyspQaSnuzc1z+SfxyIA7eymHpaWmux1Z4nfsLzccXud7fluWeL6rsXCujzQ5hroKUV0ISjmEuMsQRwt5PoRK7RGSLgD6MfFEobAxJKX4kKXbsu1srY2sh940sucl1HePwbkG1K5ndFlFtgHWuy/Vrj95S/FoM/oKk/T1F8I2unhu5HAY3TQxcXh8fEHaUFWFLl1CurqIxZrWr1/H3Ki3zTtZ6jmY2V11FrVWJs9m81ko8UPEXY6hn9mr3OblrAP5VTt0f35guz5Ar6R/5KsKbjj1cPaBFeAGrAFsIkHYbxafNhN9xf51eLh4cnI+NIyOYqwZ6Ct2Ozs0MaFmg5pcL0A2zG6jRDIBliHqbepuLGquiKvO4pbE2mb66SVc3R9ut8nb7AlX1iKaCZ7JmvFR1Q5hrA95rKQQd7sfBf4NU1J6FpsCmQx9mXbQoIT8miE4y7ycHkDKLLSFHOdNdpVrLcsxmv/O1trMphDfpKO13VzrnXNa+920XqNYWfzmCVgMzv1770bYAfZJqRqqaBvpH2ZCCeDqxcQQrLdzuafS05Pq6ur6+gbHxsYlkrahIZqJnJaWOdPQ04OsrSm4LS1RfDx2RGIxkkrR0JCcicpKNTQUx5wGWOOu7FOzpq2mzd/SPzswM+DE8zQTfsdO9Lb1Kv+HEjvAejTwlZLC5PDCuzS+sVxd2iD2W3FVHWHmif6IC1iv3GO92zbzB149ARrc/be2gbRBpBfXzMWwLFNSCMpG8fG9IyOMu0AGTUP2DJeugob+fnT8OEYZfFFkJFI0ou5uVFEhp0EgUPNkGd7fA6bg9MnlQGdt5U1OSZxdYaRVfrhFfoRlbrCFh8FHGd4W5cn/8T22hqbB38PD/FiMa0Yn4ALHEA7jG+er4fyCxAmd/gpA652w0NYp3G3mctJG55/mlwHQJ9kJ4muLCQ1R53fCzKM/lsG/gGzCv4MRgGeHuIUcZ3D3DT3iCYn0+U9+AqBdQtKlUmlyfuUp1+iYzHJ41PbugSVbjxAaPjBxnpWD6JoaArFZYqJEKhcnGAu7uqJqai7m5NA0CDo65kADgG5vT3FQXCyLQ8ZRVha6dg2ZmjL9Uo26kxLntBcwzQs7ii+kUn/LtXNUiFWsOKWHd61+FAF67+mYKOdDZHzP7VHHhGbAtzniS7lC9Apmxa6hrYcAXdPUoWPnS8aP7zEVj2NPe/gUjzYIQW2LukhkcvJdHx/Ad6+PzxA4DFlrGhhwyssj84zePDg4BxqioiiIAXpoQiE6dkylPLS2qnm+kFMvAqaCpAvYwDqq58jBZZ2HwR2/c658r0UWWAOEKODcM2+L4PwO3/LCEHutRuLBaRLdkiQz4krE0aZm+N/MSoNPbB5AvPptk8F7o8vfMKBBT8rDnrayvl0b1EI2881JDzX7JN65Q/DNaGyEywmJ5GpBwRY3N1UqDVIxGw0gCWw2xtfVFV/m5yuJkcgC0gcG1Dyfl8lqgDUz0cM+4a7uWZdZCNBbwjV6JMBqXXaAAY6Q++75HvNl7pgpE4CY3ag9fVp0VPQTtSD+/Sn1XoJGOtXToHsWW8BuvUvg/RWjo584UWTB+8bOZAYcVGevyqTEOg1HRweDgogXskhOVhMpGYLKzh6wBgRgcPX1ERgOcHvkCL40MkKGhnLoQTbc3FBsrHqPVNs+xNHRBnz/zvoZ/MkuljkDd57Jap+jlv3t3ZJJJaF0a1Vr0MmgGfb1AoY43xLVek+jofI6taA9Qz5ZYquehhc+tQGILZ0jvGNzFWm4HpZBaVtxLT1py41Vtc8XYWGA7/nsbOxKpkTi05AQ24yMbe7u5HK3l5djdvatzs451JRAAwjcYWE4IoJ4VNEIbGxQSgo2l9nyeNvYdsgVH2HFELifZQd8xa33CvZz11/OYMKdvUqQVKx0n5ygnNzQ3Ok+uJ/yOU3ROHXAY20UtRPd9p2WskVsoWjwXYMkKuPp/qFh4nOibwqyyu7AGPrOHxx94/KkChq75dtzhIY1+45NTEqUbvW2lxcAHXTrFoy/iYggHIAAEGHY5+sLXmtCIplzaQ/SY4I4kAab0gSATaSlIeks2Wlu3b1DbvX36xYTOX2e7U2w7uum9G18TARJA0RKfN53kDmTu17GFv13+5VGseJh8bTZphgZvtpoTBbLDtWj4bto4h5qvIEGauXL6kPlBlEXpOppISICcAH63kGchNa3dd/tGbw3MnYjo6y2SX5mQ1OLaYMISlKe4W+VyQBgDeMdHh4wDhYK7W7ehMEeb++ZwetsNAQGYtBtZbbs6SmnIS+PWgBM9PUh+D0gaaqwMVlSkhmSue9UAUEfaAAyIPSuKY7AQOtoE58DOQRESiGnXwo/uzn09Abfo38mNOSFufqY+VSkVAx24vgB0oWi6CKYASaYDwu+CJANeXGq9NOAsthUKsdbJVcCqQQFrKNoAMtQFeY7RwCyL352io6a2A7+K3cYwuSqXca0Ekgk0nUHrAgNYBlKtyKeJ7W+nraMG9XV7/n5wYBbUjL/QrejIwYd5AGalRXFgYMDdRfEwMxMVcjUxzL40DDGIrwVnBJZLsy4hgXAeBW55Or/SakyN9+KH+oZSr6e7M5257A4ITYhmb6ZoyJlWfSNHRhZgB7vfhW5PzBdpW3kK4XX5POtyksjO753BGQBehhfDeY/sO2IojzYcKLplddCM+h5yC1mbgVuBxAPk2WyX4eHw/iHqKjXZCZCuJknDSQwTU/HY1BpAnFiInXXwEAVBxIdXcp3ySI20oqibQDloJPrcVlE1K0qQOqoy5lT9UciRu5LZX4mGF+6LWaWkqZqGLLUZxR5PUbNR25XEumPTyzdhmsYwclFcLl4ix6jlPTy52fkNR3x+GO7Tcn89sMOM3cjNQxI0PBpKylRjIvAO82fBhKJFhbKx9ALCqZ+TQ9fmpmlc+M2mOYuZeXfzyo8YF+anVuPs26yGNwUwUEi4f38GaB8znw9HBBOot+UJi+94fD6Dccd8Vfe43t8U5FyeUI8PCcaOnIoWEdkKSiNPncZlUC4LkLjIoVCyimFrCKRqf+COgJrRy/2hDT6y7azSQKxaLOOaFj+Zgaya3pNYi4T2cu5ucQCcMVrYgIiV5oG3ejo2NpaX4EASDoUEgLK4VdePhsNJEUowgcEnTlDIQviTBoJXmX9FVYixEIpVUM4rgWe4uKoWyAYssYrLT1rvRVwj3I+UN7Z6RR8gT7+lTc5C3kJUOaAAQ1aT13SEBccR/zvqHEbX76+t1y+JnIbYzMHrwQAdP3HJykUpiA+fjXiOxsqeeYXycPx8tut9Jpth+0Zu91sagLEX+dySV7WMhUjqeq8qcOqgoajR+W4Q2xKl1ElkpjygRtGl2gasmJlVAEHiqmcQonpHz4+3mc249zN/wgulme60TRUZ3EXQgMEpgBoph6Thtg9qMaTGpfa40RacBFF70Ku901zWW2piptBYAqA6p3zY9Cw58glz6hsMrbnJUAifdE3eZfOxfs26yq6rNSCKkYx401P/HYhd6p02i4SGcXHQyK92dUVBBx0G0zkcGQkoWETh5PW0KCaBmdnef48OYnFWQbubUNrQxbvC1Zg45GjFNz9shATRImhE9XVZCf4sUDrZwH04mgcikCQStPQJIieNwej3RSsEIyS5v8UhS9oQK9gKnOeIRg+T1KDuL3y4mS/iMAKwSiZeeqD4wRf0ABBbQtV4p4hGE++a04Gew2cGA/IKSoifmlSdX4AuRttEO/7+ammgc/HUIIGyLga6BVVHT+vRJPdpt6rgHrT5Q1IrS9cQF3UK9a3PD15skoGxEs4pQj+kaaht0UwbxqonFkbjU4lj1n6cqxFzVgYGASEbUTZRtiJkUtgUUKFcCRnhoyhZ4B6baXvEEBj3dzRB8LAIGDjV3ZGF4LAiZFLYHF8Ytr7BkD/qKyGoer9Gk5sRSJF16S4bDoNY2PoxAkMq6lpaGzlE2YCbVbhQZ3QCgsHicmPGGtraxQRgZdBGx6mIivQjO5uxk/C07jq3Aegl8Ta1peExVx5j6Zhrpqs2NIPy2KhDbKQaQIJXZD343LEuwpQ2KvUOPAZJHBETbEo8YB8AXCQZ05vRkqnGz4/jctwkxKXkPTH95jSiBcIG1790paMn/nQytE7MTar4oCpC70AODB3Cp35jJAn2/D5JG2OqKoam/FCrK6vT5GGJoVy3IyaUmvrpAGuZ4yw9KxZrnscKkqblaEGqnD2LGUK7u4z72NZZj84MzwNOP7XhQhD0HMYzaSPUcVluTuie3McLiURrwV3QSE8H5yKYjegiiuMGt9zB/E7ho/Nr1/2T6HdEd3jsisyimuJ14K7oBAP7jQkt4C5K4Fpamp80CBCBa0mim2SkOBRWhpdUxMqFIK/Ygi14lsHJg1fceu3sOIgF5OXMS5dwqVv8FcQyEJQBAMvr2k5hCyJVwLdtS9n0pDidmghNHisYELvvxYlfzqVoKXgNRVO09OIDTIhUVKAWbHDgAH92g8sP7VwJeOUfCy/TgGpiguAABASqXROHxuAPv/E529VXegmJFUolPmYNHzv3biUXeLkK5BaWat7C013Hk9l7ayj2k33fgYN1dkeC6EBXI0cYm2UfBDlW1BHnrcKv52mk2ev1TjZbopRsxm4GhpfUIiDR69b/BxOjvyqXcZ9g8N08rz6bRNItsn7uPm23pGREKHQPCnpw8BASBcgZNrp6flJcPCJ1FSwD5FYrK7Q3T88SX1QBgIQFESlbKq6p+csnwRkewZaPcNlL+PoaPNMHok4+9r46II+JWpLk5cuEvajkJeoMShw77wxSiuspksX+02uvnToNBmDAkN+8Jt8XjbbBzKgATdvIhcXLN0g0ZDfmZjgzM7fH02PfH/11l2EAp6e5nbCNyFR08I2K6psfPpfJxTdzqav7Zru9v5WX/n9oT6eHBehHGNcUgW3Ux+2sM/C5N/cDY8ZXwxaucMQ3E5Yaskc/b6Ghv/npqFBQ4OmaWjQ0KBpGho0NGiahgYNDZqmoeEP0f4LhG4TdGAJDJEAAAAASUVORK5CYII=" alt="">
            </div>
          </div>
        </el-form-item>
        <el-row>
          <el-button :loading="loading" type="primary" @click="login">登 录</el-button>
        </el-row>
      </el-form>
    </div>
    <div class="footer">{{ env.VITE_FOOTER }}</div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  width: 100%;
  height: 100vh;
  background-image: url("@/assets/svg/login-bg.svg");
  background-position: center;
  background-size: 100%;

  .form {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translateY(-50%);
    width: 320px;
    padding: 36px;
    margin-left: -160px;
    box-shadow: 0 0 100px rgba(0, 0, 0, 0.08);
    background: #fff;

    button {
      width: 100%;
    }

    .logo {
      text-align: center;
      cursor: pointer;
      margin-bottom: 24px;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 40px;
        margin-right: 8px;
      }

      span {
        vertical-align: text-bottom;
        font-size: 16px;
        text-transform: uppercase;
        display: inline-block;
        font-weight: 700;
        color: #1890ff;
        background-image: -webkit-gradient(linear,37.219838% 34.532506%,36.425669% 93.178216%,from(#29cdff),to(#0a60ff),color-stop(.37,#148eff));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
  .footer {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 48px 16px 24px;
    box-sizing: border-box;
    text-align: center;
    color: rgba(0,0,0,.45);
    font-size: 13px;
  }
}
</style>
