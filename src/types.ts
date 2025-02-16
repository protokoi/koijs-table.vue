export interface Row {
  [key: string]: any
}

export interface Column {
  key: string
  label?: string
}

export interface KoiTable {
  rows: Row[] | undefined | null
  columns?: Column[]
  sticky?: boolean
  zebraRows?: boolean
  spacing?: boolean
  border?: {
    body?: boolean
    horizontal?: boolean
    vertical?: boolean
  }
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  mark?: {
    hover?: {
      row?: boolean
      column?: boolean
    }
    select?: {
      row?: boolean
      column?: boolean
    }
    spotlight?: boolean
  }
  ui?: {
    size?: {
      xs?: {
        text: string
      }
      sm?: {
        text: string
      }
      md?: {
        text: string
      }
      lg?: {
        text: string
      }
      xl?: {
        text: string
      }
    }
    wrapper?: string
    sticky?: {
      animation?: string
      base?: string
      header?: string
    }
    zebraRows?: string
    spacing?: {
      base?: string
      row?: string
      shadow?: string
      rounded?: string
    }
    mark?: {
      hover?: {
        row?: string
        column?: string
      }
      select?: {
        row?: string
        column?: string
      }
      spotlight?: string
    }
    border?: {
      body?: string
      horizontal?: string
      vertical?: string
    }
    table?: {
      base?: string
    }
    scrollbar?: {
      base?: string
      corner?: string
      thumb?: {
        base?: string
        rounded?: string
      }
      track?: {
        base?: string
        rounded?: string
      }
    }
    header?: {
      base?: string
      tr?: string
      th?: {
        base?: string
        padding?: string
      }
    }
    body?: {
      base?: string
      tr?: {
        base?: string
        hover?: string
      }
      td?: {
        base?: string
        padding?: string
      }
    }
  }
}
