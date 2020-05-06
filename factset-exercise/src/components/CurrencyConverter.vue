<template>
  <div class="currency-converter container">
    <div class="jumbotron">
      <p v-if="currenciesSelected">
        {{ value }} {{ $t(`currencyConverter.currencies.${base}`) }}
        {{ $t(`currencyConverter.equals`) }} {{ result }}
        {{ $t(`currencyConverter.currencies.${target}`) }}
      </p>

      <p>{{ date }}</p>

      <div class="input-group">
        <input
          v-model="value"
          class="form-control spaced"
          type="number"
          @input="valueOnInputHandler"
        >

        <select
          v-model="base"
          class="form-control spaced"
          @change="baseOnChangeHandler"
        >
          <option
            v-for="currency in currencyStrings"
            :key="currency"
            :value="currency"
          >
            {{ $t(`currencyConverter.currencies.${currency}`) }}
          </option>
        </select>
      </div>

      <div class="input-group">
        <input
          v-model="result"
          class="form-control spaced"
          type="number"
          @input="resultOnInputHandler"
        >

        <select
          v-model="target"
          class="form-control spaced"
          @change="targetOnChangeHandler"
        >
          <option
            v-for="currency in currenciesAvailabe"
            :key="currency"
            :value="currency"
          >
            {{ $t(`currencyConverter.currencies.${currency}`) }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable import/no-unresolved  */
import CurrencyConverter from '@/lib/currencyConverter';

export default {
  name: 'CurrencyConverter',
  props: {
    currencies: {
      type: Array,
      default: () => [],
      required: true,
    },
  },

  data() {
    return {
      date: Date,
      base: String,
      target: String,
      value: 0, // Default value
      result: 0, // Default value
    };
  },

  computed: {
    currencyStrings() {
      return this.currencies
        .map((e) => e.base) // All bases
        .concat(this.currencies.map((e) => e.target)) // All targets
        .filter((v, i, a) => a.indexOf(v) === i); // Unique values only
    },

    currenciesAvailabe() {
      const currencies = [];

      for (let i = 0; i < this.currencies.length; i += 1) {
        const currency = this.currencies[i];

        /* Check if a conversion is possible */
        if (currency.base === this.base) {
          currencies.push(currency.target);
        } else if (currency.target === this.base) {
          currencies.push(currency.base);
        }
      }

      return currencies;
    },

    currenciesSelected() {
      return typeof (this.target) === 'string' && typeof (this.base) === 'string';
    },
  },

  mounted() {
    // Set the date to today
    this.date = new Date();

    /* Set the initial currencies for convenience */
    if (this.currencies.length > 0) {
      this.base = this.currencies[0].base;
      this.target = this.currencies[0].target;
    }

    // Initialise currency converter
    this.currencyConverter = new CurrencyConverter(this.currencies);
  },

  methods: {
    /**
     * Set value using conversion
     */
    setValue() {
      /* Only trigger if both currencies have been selected */
      if (this.currenciesSelected) {
        this.value = this.currencyConverter.convert(this.target, this.base, this.result);
      }
    },


    /**
     * Set result using conversion
     */
    setResult() {
      /* Only trigger if both currencies have been selected */
      if (this.currenciesSelected) {
        this.result = this.currencyConverter.convert(this.base, this.target, this.value);
      }
    },

    /**
     * Update the result if the value is edited
     */
    valueOnInputHandler() {
      this.setResult();
    },

    /**
     * Update the value if the result is edited
     */
    resultOnInputHandler() {
      this.setValue();
    },

    /**
     * Set the target if the base is edited
     * For convenience and error avoidance
     */
    baseOnChangeHandler() {
      if (this.currenciesAvailabe.length > 0) {
        [this.target] = this.currenciesAvailabe;
      }

      this.setResult();
    },

    /**
     * Set the result
     * For convenience and error avoidance
     */
    targetOnChangeHandler() {
      this.setResult();
    },
  },
};
</script>
^
<style scoped>
.currency-converter {
  width: 30%;
  color: var(--primary-color);
}

.jumbotron {
  background-color: var(--secondary-color);
}

.spaced {
  margin: 2%;
}
</style>
