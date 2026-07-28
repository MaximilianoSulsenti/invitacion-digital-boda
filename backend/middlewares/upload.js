import multer from "multer";

const storage = multer.memoryStorage();
const MAX_FILE_SIZE_MB = 8;

const upload = multer({
	storage,
	limits: {
		fileSize: MAX_FILE_SIZE_MB * 1024 * 1024,
	},
	fileFilter: (_req, file, cb) => {
		if (!file.mimetype?.startsWith("image/")) {
			return cb(new Error("Solo se permiten archivos de imagen"));
		}
		cb(null, true);
	},
});

export default upload;