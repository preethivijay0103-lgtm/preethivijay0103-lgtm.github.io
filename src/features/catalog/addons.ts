import type { Diet, Size } from './data'
import type { DayMenu } from './data'

export type Slot = 'main' | 'protein' | 'sauce' | 'salad' | 'drink'
export const SLOTS: Slot[] = ['main', 'protein', 'sauce', 'salad', 'drink']
export const SLOT_LABEL: Record<Slot, string> = {
  main: 'Main + Side',
  protein: 'Protein',
  sauce: 'Sauce',
  salad: 'Salad',
  drink: 'Drink',
}

export interface AddonItem { name: string; price: number; protein: number }

type LevelMap = Record<Size, AddonItem>
type DayAddons = {
  main: LevelMap
  salad: LevelMap
  drink: LevelMap
  sauce: LevelMap
  protein: Record<Diet, LevelMap>
}

export const ADDONS: Record<DayMenu['id'], DayAddons> = {
  "mon": {
    "main": {
      "core": {
        "name": "Multigrain Dosa + Peanut Chutney",
        "price": 50,
        "protein": 8.3
      },
      "strong": {
        "name": "Multigrain Dosa + Peanut Chutney",
        "price": 50,
        "protein": 8.3
      },
      "elite": {
        "name": "Multigrain Dosa + Peanut Chutney",
        "price": 50,
        "protein": 8.3
      }
    },
    "salad": {
      "core": {
        "name": "Black Chickpea & Peanut Salad",
        "price": 50,
        "protein": 4.9
      },
      "strong": {
        "name": "Black Chickpea & Peanut Salad",
        "price": 60,
        "protein": 6.9
      },
      "elite": {
        "name": "Black Chickpea & Peanut Salad",
        "price": 70,
        "protein": 12.4
      }
    },
    "drink": {
      "core": {
        "name": "Fermented Rice",
        "price": 30,
        "protein": 2.7
      },
      "strong": {
        "name": "Fermented Rice",
        "price": 30,
        "protein": 2.7
      },
      "elite": {
        "name": "Fermented Rice",
        "price": 30,
        "protein": 2.7
      }
    },
    "sauce": {
      "core": {
        "name": "Roasted Pepper Yogurt Dip",
        "price": 10,
        "protein": 0.5
      },
      "strong": {
        "name": "Roasted Pepper Yogurt Dip",
        "price": 10,
        "protein": 0.5
      },
      "elite": {
        "name": "Roasted Pepper Yogurt Dip",
        "price": 10,
        "protein": 0.5
      }
    },
    "protein": {
      "veg": {
        "core": {
          "name": "Palak Paneer + Rajma",
          "price": 100,
          "protein": 14.5
        },
        "strong": {
          "name": "Palak Paneer + Rajma",
          "price": 130,
          "protein": 21.7
        },
        "elite": {
          "name": "Palak Paneer + Rajma",
          "price": 170,
          "protein": 26.2
        }
      },
      "nonveg": {
        "core": {
          "name": "Black Pepper Chicken",
          "price": 100,
          "protein": 14.0
        },
        "strong": {
          "name": "Black Pepper Chicken",
          "price": 140,
          "protein": 22.2
        },
        "elite": {
          "name": "Black Pepper Chicken",
          "price": 160,
          "protein": 26.9
        }
      }
    }
  },
  "tue": {
    "main": {
      "core": {
        "name": "Foxtail Millet Upma + Coconut Chutney",
        "price": 60,
        "protein": 7.4
      },
      "strong": {
        "name": "Foxtail Millet Upma + Coconut Chutney",
        "price": 60,
        "protein": 7.4
      },
      "elite": {
        "name": "Foxtail Millet Upma + Coconut Chutney",
        "price": 60,
        "protein": 7.4
      }
    },
    "salad": {
      "core": {
        "name": "Sprouts & Kidney Bean Salad",
        "price": 60,
        "protein": 7.4
      },
      "strong": {
        "name": "Sprouts & Kidney Bean Salad",
        "price": 60,
        "protein": 8.7
      },
      "elite": {
        "name": "Sprouts & Kidney Bean Salad",
        "price": 60,
        "protein": 8.7
      }
    },
    "drink": {
      "core": {
        "name": "Watermelon Cooler",
        "price": 40,
        "protein": 0.8
      },
      "strong": {
        "name": "Watermelon Cooler",
        "price": 40,
        "protein": 0.8
      },
      "elite": {
        "name": "Watermelon Cooler",
        "price": 40,
        "protein": 0.8
      }
    },
    "sauce": {
      "core": {
        "name": "Chickpea Sauce",
        "price": 10,
        "protein": 0.6
      },
      "strong": {
        "name": "Chickpea Sauce",
        "price": 10,
        "protein": 0.6
      },
      "elite": {
        "name": "Chickpea Sauce",
        "price": 10,
        "protein": 0.6
      }
    },
    "protein": {
      "veg": {
        "core": {
          "name": "Paneer Tikka + Bean & Sprout Chaat",
          "price": 100,
          "protein": 14.0
        },
        "strong": {
          "name": "Paneer Tikka + Bean & Sprout Chaat",
          "price": 130,
          "protein": 22.5
        },
        "elite": {
          "name": "Paneer Tikka + Bean & Sprout Chaat",
          "price": 160,
          "protein": 32.5
        }
      },
      "nonveg": {
        "core": {
          "name": "Chicken Tikka",
          "price": 100,
          "protein": 14.3
        },
        "strong": {
          "name": "Chicken Tikka",
          "price": 130,
          "protein": 23.3
        },
        "elite": {
          "name": "Chicken Tikka",
          "price": 180,
          "protein": 33.4
        }
      }
    }
  },
  "wed": {
    "main": {
      "core": {
        "name": "Sweet Potato Pancakes with Thick Yogurt",
        "price": 70,
        "protein": 10.6
      },
      "strong": {
        "name": "Sweet Potato Pancakes with Thick Yogurt",
        "price": 70,
        "protein": 10.0
      },
      "elite": {
        "name": "Sweet Potato Pancakes with Thick Yogurt",
        "price": 70,
        "protein": 10.6
      }
    },
    "salad": {
      "core": {
        "name": "Black Bean & Corn Salad",
        "price": 70,
        "protein": 7.9
      },
      "strong": {
        "name": "Black Bean & Corn Salad",
        "price": 60,
        "protein": 5.8
      },
      "elite": {
        "name": "Black Bean & Corn Salad",
        "price": 70,
        "protein": 8.1
      }
    },
    "drink": {
      "core": {
        "name": "Fermented Pearl Millet",
        "price": 30,
        "protein": 4.0
      },
      "strong": {
        "name": "Fermented Pearl Millet",
        "price": 30,
        "protein": 4.0
      },
      "elite": {
        "name": "Fermented Pearl Millet",
        "price": 30,
        "protein": 4.0
      }
    },
    "sauce": {
      "core": {
        "name": "Roasted Red Pepper Sauce",
        "price": 10,
        "protein": 0.2
      },
      "strong": {
        "name": "Roasted Red Pepper Sauce",
        "price": 10,
        "protein": 0.2
      },
      "elite": {
        "name": "Roasted Red Pepper Sauce",
        "price": 10,
        "protein": 0.2
      }
    },
    "protein": {
      "veg": {
        "core": {
          "name": "Spiced Soy Chunks",
          "price": 60,
          "protein": 9.1
        },
        "strong": {
          "name": "Spiced Soy Chunks",
          "price": 80,
          "protein": 22.1
        },
        "elite": {
          "name": "Spiced Soy Chunks",
          "price": 90,
          "protein": 27.3
        }
      },
      "nonveg": {
        "core": {
          "name": "Broccoli Omelette",
          "price": 80,
          "protein": 7.4
        },
        "strong": {
          "name": "Broccoli Omelette + Herb & Lemon Chicken Bites",
          "price": 140,
          "protein": 20.1
        },
        "elite": {
          "name": "Broccoli Omelette + Herb & Lemon Chicken Bites",
          "price": 170,
          "protein": 27.3
        }
      }
    }
  },
  "thu": {
    "main": {
      "core": {
        "name": "Oats Paddu + Chutney",
        "price": 60,
        "protein": 6.7
      },
      "strong": {
        "name": "Oats Paddu + Chutney",
        "price": 60,
        "protein": 6.2
      },
      "elite": {
        "name": "Oats Paddu + Chutney",
        "price": 60,
        "protein": 6.2
      }
    },
    "salad": {
      "core": {
        "name": "Soybean & Beetroot Salad",
        "price": 50,
        "protein": 3.0
      },
      "strong": {
        "name": "Soybean & Beetroot Salad",
        "price": 50,
        "protein": 4.9
      },
      "elite": {
        "name": "Soybean & Beetroot Salad",
        "price": 60,
        "protein": 10.6
      }
    },
    "drink": {
      "core": {
        "name": "Fermented Finger Millet",
        "price": 30,
        "protein": 3.1
      },
      "strong": {
        "name": "Fermented Finger Millet",
        "price": 30,
        "protein": 3.1
      },
      "elite": {
        "name": "Fermented Finger Millet",
        "price": 30,
        "protein": 3.1
      }
    },
    "sauce": {
      "core": {
        "name": "Chickpea Sauce",
        "price": 10,
        "protein": 0.6
      },
      "strong": {
        "name": "Chickpea Sauce",
        "price": 10,
        "protein": 0.6
      },
      "elite": {
        "name": "Chickpea Sauce",
        "price": 10,
        "protein": 0.6
      }
    },
    "protein": {
      "veg": {
        "core": {
          "name": "Soy & Sweet Potato Cutlet",
          "price": 70,
          "protein": 16.7
        },
        "strong": {
          "name": "Soy & Sweet Potato Cutlet",
          "price": 90,
          "protein": 27.1
        },
        "elite": {
          "name": "Soy & Sweet Potato Cutlet",
          "price": 90,
          "protein": 29.7
        }
      },
      "nonveg": {
        "core": {
          "name": "Boiled Egg Salad + Chicken Garlic & Curd Roast",
          "price": 120,
          "protein": 16.7
        },
        "strong": {
          "name": "Boiled Egg Salad + Chicken Garlic & Curd Roast",
          "price": 160,
          "protein": 25.1
        },
        "elite": {
          "name": "Boiled Egg Salad + Chicken Garlic & Curd Roast",
          "price": 180,
          "protein": 29.5
        }
      }
    }
  },
  "fri": {
    "main": {
      "core": {
        "name": "Ragi Idiyappam + Coconut Milk",
        "price": 40,
        "protein": 3.5
      },
      "strong": {
        "name": "Ragi Idiyappam + Coconut Milk",
        "price": 40,
        "protein": 3.5
      },
      "elite": {
        "name": "Ragi Idiyappam + Coconut Milk",
        "price": 40,
        "protein": 3.5
      }
    },
    "salad": {
      "core": {
        "name": "Sprouts & Sweet Potato Salad",
        "price": 50,
        "protein": 5.0
      },
      "strong": {
        "name": "Sprouts & Sweet Potato Salad",
        "price": 50,
        "protein": 6.3
      },
      "elite": {
        "name": "Sprouts & Sweet Potato Salad",
        "price": 50,
        "protein": 6.3
      }
    },
    "drink": {
      "core": {
        "name": "Spiced Buttermilk",
        "price": 40,
        "protein": 3.2
      },
      "strong": {
        "name": "Spiced Buttermilk",
        "price": 40,
        "protein": 3.2
      },
      "elite": {
        "name": "Spiced Buttermilk",
        "price": 40,
        "protein": 3.2
      }
    },
    "sauce": {
      "core": {
        "name": "Roasted Pepper Yogurt Dip",
        "price": 10,
        "protein": 0.5
      },
      "strong": {
        "name": "Roasted Pepper Yogurt Dip",
        "price": 10,
        "protein": 0.5
      },
      "elite": {
        "name": "Roasted Pepper Yogurt Dip",
        "price": 10,
        "protein": 0.5
      }
    },
    "protein": {
      "veg": {
        "core": {
          "name": "Spinach Paneer with Soy Mince",
          "price": 100,
          "protein": 19.1
        },
        "strong": {
          "name": "Spinach Paneer with Soy Mince",
          "price": 110,
          "protein": 26.9
        },
        "elite": {
          "name": "Spinach Paneer with Soy Mince",
          "price": 150,
          "protein": 36.6
        }
      },
      "nonveg": {
        "core": {
          "name": "Spiced Grilled Chicken",
          "price": 110,
          "protein": 18.0
        },
        "strong": {
          "name": "Spiced Grilled Chicken",
          "price": 160,
          "protein": 27.6
        },
        "elite": {
          "name": "Spiced Grilled Chicken",
          "price": 210,
          "protein": 37.2
        }
      }
    }
  }
}

export function addonFor(dayId: DayMenu['id'], slot: Slot, size: Size, diet: Diet): AddonItem {
  const day = ADDONS[dayId]
  if (slot === 'protein') return day.protein[diet][size]
  return day[slot][size]
}

