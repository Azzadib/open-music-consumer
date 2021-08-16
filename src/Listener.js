class Listener {
  constructor(songsService, mailSender) {
    this._songsService = songsService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());

      const songs = await this._songsService.getPlaylist(playlistId);
      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(songs));
      console.log('export data:', result);
    } catch (error) {
      console.log('listen', error);
    }
  }
}

module.exports = Listener;
