import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CodeIcon from '@mui/icons-material/Code';
import TerminalIcon from '@mui/icons-material/Terminal';
import BuildIcon from '@mui/icons-material/Build';


// MUIテーブルから引用
function createData(category, name, skillLevel, experience, history) {
  return { category, name, skillLevel, experience, history };
}

const categoryIcons = {
  Frontend: <CodeIcon sx={{ mr: 1 }} />,
  Backend: <BuildIcon sx={{ mr: 1 }} />,
  Language: <TerminalIcon sx={{ mr: 1 }} />,
};


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const renderStars = (level) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        i < level
          ? <StarIcon key={i} sx={{ color: '#fbc02d' }} />
          : <StarBorderIcon key={i} sx={{ color: '#ccc' }} />
      );
    }
    return stars;
  };

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{renderStars(row.skillLevel)}</TableCell>
        <TableCell align="right">{row.experience} years</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Description
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {row.history}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    category: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    skillLevel: PropTypes.number.isRequired,
    experience: PropTypes.number.isRequired,
    history: PropTypes.string.isRequired,
  }).isRequired,
};


const rows = [
  createData('Frontend', 'React', 2, 1, '個人開発で使用。コンポーネント指向の基本概念を理解しており、リファレンスを参照すれば一般的な実装が可能。'),
  createData('Frontend', 'HTML/CSS', 4, 2, '大学の授業や個人開発で多く使用。レイアウト実装に慣れており、リファレンスを参照して柔軟に対応できる。'),
  createData('Frontend', 'JavaScript', 3, 2, 'WebサイトやWebアプリケーションの開発で使用。基礎文法を理解しており、リファレンスを活用して機能を実装できる。'),
  createData('Frontend', 'TypeScript', 1, 0.5, 'Webアプリケーション開発に向けて基礎文法を学習中。小規模なコードの記述経験あり。'),
  createData('Backend', 'Node.js', 2, 1, 'Webアプリケーション開発を通じて基礎を習得。簡単なバックエンド処理の実装が可能。'),
  createData('Language', 'Python', 4, 2.5, '主に機械学習のプロジェクトで使用。授業外でも個人・チームでの開発経験があり、実践的なスクリプトの作成が可能。'),
  createData('Language', 'C', 2, 1, '大学の授業で使用。ポインタやアドレス演算などの基礎文法を理解している。'),
  createData('Language', 'Java', 2, 1, '大学の授業や個人開発で使用。スマートフォンアプリやWebアプリのバックエンド開発経験あり。'),
];




const groupedRows = rows.reduce((acc, row) => {
  if (!acc[row.category]) acc[row.category] = [];
  acc[row.category].push(row);
  return acc;
}, {});

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Language / Environment</TableCell>
            <TableCell align="right">Skill Level</TableCell>
            <TableCell align="right">Experience</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(groupedRows).map(([category, items]) => (
            <React.Fragment key={category}>
              <TableRow>
                <TableCell colSpan={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    {categoryIcons[category] || null}
                    <Typography variant="h6">
                      {category}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>

              {items.map((row) => (
                <Row key={row.name} row={row} />
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
