import { Container, Grid, Paper } from "@mui/material";

export default function Reports({ loading, reports }) {
  const formatTime = (time) => {
    let tmp = new Date(time)
    return tmp.getHours() + ':' + tmp.getMinutes() + ' ' + tmp.getDate() + '/' + tmp.getMonth() + '/' + tmp.getFullYear()
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, md: 2 }}>
      <Paper
        square={true}
        elevation={3}
        sx={{
          bgcolor: "#6962e6",
          color: "#fff",
          fontSize: "16px",
          textAlign: "center",
        }}
      >
        <Grid container>
          <Grid item md={1} sx={{ p: 2 }}>
            S.No.
          </Grid>
          <Grid item md={4} sx={{ p: 2 }}>
            Task
          </Grid>
          <Grid item md={2} sx={{ p: 2 }}>
            From
          </Grid>
          <Grid item md={2} sx={{ p: 2 }}>
            To
          </Grid>
          <Grid item md={3} sx={{ p: 2 }}>
            Time
          </Grid>
        </Grid>
      </Paper>

      <Paper
        elevation={3}
        sx={{
          textAlign: "center",
        }}
      >
        {loading ? (
          <div style={{ padding: 32 }}>Loading</div>
        ) : (
          reports && reports.length > 0 ? (
            reports.map((report, ind) => {
              return (
                <Grid container key={report.key}>
                  <Grid item md={1} sx={{ p: 2 }}>
                    {ind + 1}
                  </Grid>
                  <Grid item md={4} sx={{ p: 2 }}>
                    {report.todoID}
                  </Grid>
                  <Grid item md={2} sx={{ p: 2 }}>
                    {report.status?.from}
                  </Grid>
                  <Grid item md={2} sx={{ p: 2 }}>
                    {report.status?.to}
                  </Grid>
                  <Grid item md={3} sx={{ p: 2 }}>
                    {formatTime(report.time)}
                  </Grid>
                </Grid>
              )
            })
          ) : (
            <div style={{ padding: 32, fontStyle:'italic', color:'grey' }}>No tasks found</div>
          )
        )}
      </Paper>
    </Container>
  )
}
