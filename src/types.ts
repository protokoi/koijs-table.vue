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
    horizontal?: boolean
    vertical?: boolean
  }
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
