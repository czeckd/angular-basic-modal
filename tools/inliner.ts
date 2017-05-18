import { writeFileSync, readFileSync, existsSync, mkdirSync, createReadStream, createWriteStream } from 'fs';

let component = readFileSync('lib/base-modal.component.ts').toString();

const styles = readFileSync('lib/base-modal.component.css');
component = component.replace(/styleUrls:\s*\[.*?\]/, `styles: [\n\`${styles}\n\`]`);

const dir = './tmp';
if (!existsSync(dir)) {
	mkdirSync(dir);
}

writeFileSync('tmp/base-modal.component.ts', component);

