<template>
  <form>
    <div class="form-row">
      <label for="eth-address">Ethereum address</label>
      <input type="text" class="form-control form-control-lg monospace" :class="{ 'is-valid': valid === true, 'is-invalid': valid === false }" id="eth-address" v-model="eth_address" required>
      <small class="form-text text-muted">An Ethereum address starts with '<samp>0x</samp>'.</small>

      <div class="valid-feedback">
        The address is valid.
      </div>
      <div class="invalid-feedback">
        Please enter a valid address.
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { eth_validate } from '@/lib'

@Component({})
export default class EthAddress extends Vue {
  @Prop()
  value!: string

  private eth_address: string = this.value
  private valid: boolean | null = null

  @Watch('eth_address', { immediate: true })
  onInput() {
    this.valid = this.eth_address === '' ? null : eth_validate(this.eth_address)

    this.$emit('input', this.eth_address)
    this.$emit('valid', this.valid)
  }
}
</script>
