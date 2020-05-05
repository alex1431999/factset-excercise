<template>
  <div class="currency-converter">
    <p v-if="base && target && value && result">
      {{value}} {{$t(`currencyConverter.currencies.${base}`)}} {{$t(`currencyConverter.equals`)}} {{result}} {{$t(`currencyConverter.currencies.${target}`)}}
    </p>

    <p>{{date}}</p>

    <input 
      type="number" 
      v-model="value" 
      @input="valueOnInputHandler"
    />

    <select v-model="base" @change="baseOnChangeHandler">
      <option 
        v-for="currency in currencyStrings" 
        :value="currency" :key="currency">
          {{$t(`currencyConverter.currencies.${currency}`)}}
        </option>
    </select>
    <br/>

    <input 
      type="number" 
      v-model="result" 
      @input="resultOnInputHandler"
    />

    <select v-model="target" @change="targetOnChangeHandler">
      <option 
        v-for="currency in currenciesAvailabe" 
        :value="currency" 
        :key="currency">
          {{$t(`currencyConverter.currencies.${currency}`)}}
        </option>
    </select>
  </div>
</template>

<script>
import CurrencyConverter from "@/lib/currencyConverter";

export default {
  name: 'currencyConverter',
  props: {
    currencies: Array, 
  },

  data() {
    return {
      date: Date,
      base: String,
      target: String,
      value: 0, // Default value
      result: 0, // Default value
    }
  },

  computed: {
    currencyStrings() {
      return this.currencies
        .map(e => e.base) // All bases
        .concat(this.currencies.map(e => e.target)) // All targets
        .filter((v, i, a) => a.indexOf(v) === i) // Unique values only
    },

    currenciesAvailabe() {
      const currencies = []

      for (let i = 0; i < this.currencies.length; i += 1) {
        const currency = this.currencies[i]

        /* Check if a conversion is possible */
        if (currency.base === this.base) {
          currencies.push(currency.target)
        } else if (currency.target === this.base) {
          currencies.push(currency.base)
        }
      }

      return currencies
    },
  },

  mounted() {
    // Set the date to today
    this.date = new Date()

    /* Set the initial currencies for convenience */
    if (this.currencies.length > 0) {
      this.base = this.currencies[0].base
      this.target = this.currencies[0].target
    }

    // Initialise currency converter
    this.currencyConverter = new CurrencyConverter(this.currencies)
  },

  methods: {

    /**
     * Set value using conversion
     */
    setValue() {
      /* Only trigger if both currencies have been selected */
      if (typeof(this.target) === 'string' && typeof(this.base) === 'string') {
        this.value = this.currencyConverter.convert(this.target, this.base, this.result)
      }
    },


    /**
     * Set result using conversion
     */
    setResult() {
      /* Only trigger if both currencies have been selected */
      if (typeof(this.target) === 'string' && typeof(this.base) === 'string') {
        this.result = this.currencyConverter.convert(this.base, this.target, this.value)
      }
    },

    /**
     * Update the result if the value is edited
     */
    valueOnInputHandler() {
      this.setResult()
    },

    /**
     * Update the value if the result is edited
     */
    resultOnInputHandler() {
      this.setValue()
    },

    /**
     * Set the target if the base is edited
     * For convenience and error avoidance
     */
    baseOnChangeHandler() {
      if (this.currenciesAvailabe.length > 0) {
        this.target = this.currenciesAvailabe[0]
      }

      this.setResult()
    },
    
    /**
     * Set the result
     * For convenience and error avoidance
     */
    targetOnChangeHandler() {
      this.setResult()
    }
  }
}
</script>
