export const jsonData = {
    "id": "11|BLINKIT|PERFORMANCE|TEST",
    "brandId": "11",
    "name": "Blinkit",
    "logo": "/icons/blinkit.svg",
    "description": "Deep drive and analyse KPIs from BlinkIt",
    "active": true,
    "cards": [
      {
        "visualizationType": "linechart1",
        "title": "Sales (MRP)",
        "id": "blinkit-insights-sku-sales_mrp",
        "logo": "/icons/blinkit.svg",
        "description": "",
        "gridStackProperties": {
          "x": 0.0,
          "w": 4.0
        },
        "query": "[{\"measures\":[\"blinkit_insights_sku.sales_mrp_sum\"],\"timeDimensions\":[{\"dimension\":\"blinkit_insights_sku.created_at\",\"dateRange\":\"this month\"}]},{\"measures\":[\"blinkit_insights_sku.sales_mrp_sum\"],\"timeDimensions\":[{\"dimension\":\"blinkit_insights_sku.created_at\",\"dateRange\":\"this month\",\"granularity\":\"day\"}],\"order\":{\"blinkit_insights_sku.created_at\":\"asc\"}}]",
        "datatableProperties": {
          "columnOrder": [],
          "columnsPinned": [],
          "columnsVisible": {}
        },
        "active": true
      },
      {
        "visualizationType": "semipiechart",
        "title": "Top cities",
        "id": "blinkit-insights-city-sales_mrp_sum",
        "logo": "/icons/blinkit.svg",
        "description": "Know which cities are contributing the most 📈",
        "gridStackProperties": {
          "x": 4.0,
          "w": 4.0
        },
        "query": "[{\"measures\":[\"blinkit_insights_city.sales_mrp_sum\"],\"order\":{\"blinkit_insights_city.sales_mrp_sum\":\"desc\"},\"dimensions\":[\"blinkit_insights_city.name\"],\"timeDimensions\":[{\"dimension\":\"blinkit_insights_city.created_at\",\"dateRange\": \"this month\"}],\"limit\":4}]",
        "datatableProperties": {
          "columnOrder": ["blinkit_insights_city.sales_mrp_sum"],
          "columnsPinned": [],
          "columnsVisible": {
            "blinkit_insights_city.sales_mrp_sum": true
          }
        },
        "active": true
      },
      {
        "visualizationType": "linechart2",
        "title": "Items sold",
        "id": "blinkit-insights-sku-qty_sold",
        "logo": "/icons/blinkit.svg",
        "description": "",
        "gridStackProperties": {
          "x": 12.0,
          "w": 4.0
        },
        "query": "[{\"measures\":[\"blinkit_insights_sku.qty_sold\"],\"timeDimensions\":[{\"dimension\":\"blinkit_insights_sku.created_at\",\"dateRange\":\"this month\"}],\"order\":{\"blinkit_insights_sku.created_at\":\"asc\"}},{\"measures\":[\"blinkit_insights_sku.qty_sold\"],\"timeDimensions\":[{\"dimension\":\"blinkit_insights_sku.created_at\",\"dateRange\":\"this month\",\"granularity\":\"day\"}],\"order\":{\"blinkit_insights_sku.created_at\":\"asc\"}}]",
        "datatableProperties": {
          "columnOrder": [],
          "columnsPinned": [],
          "columnsVisible": {}
        },
        "active": true
      },
      {
        "visualizationType": "table",
        "title": "Product Insights",
        "id": "blinkit-insights-sku",
        "logo": "/icons/blinkit.svg",
        "description": "Analytics for all your SKUs 📦",
        "gridStackProperties": {
          "x": 0.0,
          "w": 12.0
        },
        "query": "[{\"measures\":[\"blinkit_insights_sku.sales_mrp_sum\",\"blinkit_insights_sku.qty_sold\",\"blinkit_insights_sku.drr_7\",\"blinkit_insights_sku.drr_14\",\"blinkit_insights_sku.drr_30\",\"blinkit_insights_sku.sales_mrp_max\",\"blinkit_insights_sku.month_to_date_sales\",\"blinkit_insights_sku.be_inv_qty\",\"blinkit_insights_sku.fe_inv_qty\",\"blinkit_insights_sku.inv_qty\",\"blinkit_insights_sku.days_of_inventory_14\",\"blinkit_insights_sku.days_of_inventory_max\",\"blinkit_scraping_stream.on_shelf_availability\",\"blinkit_scraping_stream.rank_avg\",\"blinkit_scraping_stream.selling_price_avg\",\"blinkit_scraping_stream.discount_avg\"],\"dimensions\":[\"blinkit_insights_sku.id\",\"blinkit_insights_sku.name\"],\"timeDimensions\":[{\"dimension\":\"blinkit_insights_sku.created_at\",\"dateRange\":\"this month\"}]}]",
        "datatableProperties": {
          "columnOrder": [
            "blinkit_insights_sku.name",
            "blinkit_insights_sku.sales_mrp_sum",
            "blinkit_insights_sku.qty_sold",
            "blinkit_insights_sku.drr_7",
            "blinkit_insights_sku.drr_14",
            "blinkit_insights_sku.days_of_inventory_14",
            "blinkit_insights_sku.drr_30",
            "blinkit_insights_sku.sales_mrp_max",
            "blinkit_insights_sku.month_to_date_sales",
            "blinkit_insights_sku.be_inv_qty",
            "blinkit_insights_sku.fe_inv_qty",
            "blinkit_insights_sku.inv_qty",
            "blinkit_insights_sku.days_of_inventory_max",
            "blinkit_scraping_stream.on_shelf_availability",
            "blinkit_scraping_stream.selling_price_avg",
            "blinkit_scraping_stream.discount_avg",
            "blinkit_scraping_stream.rank_avg"
          ],
          "columnsPinned": ["selection-checkbox", "blinkit_insights_sku.name"],
          "columnsVisible": {
            "blinkit_scraping_stream.rank_avg": true,
            "blinkit_scraping_stream.discount_avg": true,
            "blinkit_insights_sku.month_to_date_sales": true,
            "blinkit_insights_sku.name": true,
            "blinkit_insights_sku.days_of_inventory_14": true,
            "blinkit_insights_sku.drr_30": true,
            "blinkit_insights_sku.days_of_inventory_max": true,
            "blinkit_insights_sku.drr_7": true,
            "blinkit_scraping_stream.selling_price_avg": true,
            "blinkit_insights_sku.sales_mrp_max": true,
            "blinkit_insights_sku.id": false,
            "blinkit_scraping_stream.on_shelf_availability": true,
            "blinkit_insights_sku.be_inv_qty": true,
            "blinkit_insights_sku.inv_qty": true,
            "blinkit_insights_sku.fe_inv_qty": true,
            "blinkit_insights_sku.drr_14": true,
            "blinkit_insights_sku.sales_mrp_sum": true,
            "blinkit_insights_sku.qty_sold": true
          }
        },
        "active": true
      },
      {
        "visualizationType": "table",
        "title": "City Insights",
        "id": "blinkit-insights-city",
        "logo": "/icons/blinkit.svg",
        "description": "Know your sales trend across cities 🗺️",
        "gridStackProperties": {
          "x": 0.0,
          "w": 12.0
        },
        "query": "[{\"measures\":[\"blinkit_insights_city.sales_mrp_sum\",\"blinkit_insights_city.qty_sold\",\"blinkit_insights_city.drr_7\",\"blinkit_insights_city.drr_14\",\"blinkit_insights_city.drr_30\",\"blinkit_insights_city.sales_mrp_max\",\"blinkit_insights_city.month_to_date_sales\",\"blinkit_insights_city.be_inv_qty\",\"blinkit_insights_city.fe_inv_qty\",\"blinkit_insights_city.inv_qty\",\"blinkit_insights_city.days_of_inventory_14\",\"blinkit_insights_city.days_of_inventory_max\",\"blinkit_scraping_stream.on_shelf_availability\",\"blinkit_scraping_stream.rank_avg\",\"blinkit_scraping_stream.selling_price_avg\",\"blinkit_scraping_stream.discount_avg\"],\"dimensions\":[\"blinkit_insights_city.id\",\"blinkit_insights_city.name\"],\"timeDimensions\":[{\"dimension\":\"blinkit_insights_city.created_at\",\"dateRange\":\"this month\"}]}]",
        "datatableProperties": {
          "columnOrder": [
            "blinkit_insights_city.id",
            "blinkit_insights_city.name",
            "blinkit_insights_city.sales_mrp_sum",
            "blinkit_insights_city.qty_sold",
            "blinkit_insights_city.drr_7",
            "blinkit_insights_city.drr_14",
            "blinkit_insights_city.days_of_inventory_14",
            "blinkit_insights_city.drr_30",
            "blinkit_insights_city.sales_mrp_max",
            "blinkit_insights_city.month_to_date_sales",
            "blinkit_insights_city.be_inv_qty",
            "blinkit_insights_city.fe_inv_qty",
            "blinkit_insights_city.inv_qty",
            "blinkit_insights_city.days_of_inventory_max",
            "blinkit_scraping_stream.on_shelf_availability",
            "blinkit_scraping_stream.selling_price_avg",
            "blinkit_scraping_stream.discount_avg",
            "blinkit_scraping_stream.rank_avg"
          ],
          "columnsPinned": ["selection-checkbox", "blinkit_insights_city.name"],
          "columnsVisible": {
            "blinkit_scraping_stream.rank_avg": true,
            "blinkit_insights_city.fe_inv_qty": true,
            "blinkit_scraping_stream.discount_avg": true,
            "blinkit_insights_city.sales_mrp_sum": true,
            "blinkit_insights_city.drr_7": true,
            "blinkit_insights_city.drr_14": true,
            "blinkit_insights_city.sales_mrp_max": true,
            "blinkit_insights_city.drr_30": true,
            "blinkit_scraping_stream.selling_price_avg": true,
            "blinkit_insights_city.days_of_inventory_max": true,
            "blinkit_insights_city.month_to_date_sales": true,
            "blinkit_insights_city.be_inv_qty": true,
            "blinkit_insights_city.id": false,
            "blinkit_insights_city.days_of_inventory_14": true,
            "blinkit_insights_city.inv_qty": true,
            "blinkit_insights_city.qty_sold": true,
            "blinkit_scraping_stream.on_shelf_availability": true,
            "blinkit_insights_city.name": true
          }
        },
        "active": true
      }
    ]
  }