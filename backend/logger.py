import logging


# Logging setup
class CustomFormatter(logging.Formatter):
    """Custom formatter with colors for different log levels."""

    gray, yellow, red, bold_red, reset = (
        "\x1b[38;20m",
        "\x1b[33;20m",
        "\x1b[31;20m",
        "\x1b[31;1m",
        "\x1b[0m",
    )
    FORMATS = {
        logging.DEBUG: gray + "[%(asctime)s] %(levelname)s: %(message)s" + reset,
        logging.INFO: gray + "[%(asctime)s] %(levelname)s: %(message)s" + reset,
        logging.WARNING: yellow + "[%(asctime)s] %(levelname)s: %(message)s" + reset,
        logging.ERROR: red + "[%(asctime)s] %(levelname)s: %(message)s" + reset,
        logging.CRITICAL: bold_red + "[%(asctime)s] %(levelname)s: %(message)s" + reset,
    }

    def format(self, record):
        log_fmt = self.FORMATS.get(record.levelno, self.gray)
        return logging.Formatter(log_fmt, datefmt="%Y-%m-%d %H:%M:%S").format(record)
