library(shiny)
library(shinydashboard)
ui <-
  fluidPage(
    # THE UI
    tags$html(
      tags$body(
        shinyjs::useShinyjs(),
        waiter::useWaiter(),
        singleton(tags$head(tags$script(src = "p5.min.js"))),
        singleton(tags$head(tags$script(src="https://unpkg.com/p5.js-svg@1.1.1"))),
        tags$head(tags$script(src = "sketch.js")),
        div(
          id = "title",
          h1("Title")
        ),
        tags$div(id = "canvasContainer", tags$div(id = "divCanvas", style = "width:auto; height:auto")),
        fileInput(inputId = "logo", label = "Load Logo", accept = "image/*"),
        actionButton(inputId = "save", label = "Save")
      )
    )
  )

server <- function(input, output, session) {
  observeEvent(input$logo, {
    file <- input$logo
    tfile = tempfile(fileext = '.png')
    file.remove('www/here.png')
    file.copy(
      from = file$datapath,
      to = 'www/here.png'
    )
    session$sendCustomMessage(type = "change-logo", message = list(filepath = 'here.png'))
  })

  observeEvent(input$save, {
    session$sendCustomMessage(type = "save", message = 'SAVE')
  })

  observeEvent(input$image_loading, {
    waiter::waiter_show( # show the waiter
      html = waiter::spin_1() # use a spinner
    )
    unlink('image.png')
  })


  observeEvent(input$imageBase64String, {
    t1 <- Sys.time()

    base64 <- input$imageBase64String$base64
    data_url <- input$imageBase64String$url
    data_url |> dipsaus::base64_to_image('image.png')
    # base64 |>
    #   charToRaw() |>
    #   openssl::base64_encode() |>
    #   dipsaus::base64_to_image('image.png')
    waiter::waiter_hide()
    t2 <- Sys.time()
    print(t2 - t1)
  })
}

shiny::shinyApp(ui, server)
